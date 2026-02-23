import error from "../src/errors/error";
import { NewUser, SavedUser, SavedUserSensitive } from "../src/types/types";
import middleware from "../src/utils/middleware";
import pool from "./pool";

// user queries
const getAllUsers = async (): Promise<SavedUser[]> => {
  const result = await pool.query<SavedUser>(
    `
      SELECT id, username FROM users;
    `
  );
  
  return result.rows;
};

const getAllUsersSensitive = async (): Promise<SavedUserSensitive[]> => {
  const result = await pool.query<SavedUserSensitive>(
    `
      SELECT * FROM users;
    `
  );
  
  return result.rows;
};

const getUserById = async (id: number): Promise<SavedUser> => {
  if (isNaN(Number(id))) {
    throw new error.ValidationError('id is not a number');
  }

  const result = await pool.query<SavedUser>(
    `
      SELECT id, username FROM users WHERE id = $1;
    `,
    [Number(id)],
  );

  if (!result?.rows || result.rows.length === 0) {
    throw new error.NotFoundError('user not found');
  }

  return result.rows[0];
};

const createUser = async ({ username, password }: NewUser): Promise<SavedUserSensitive> => {
  const password_hash = await middleware.hashPassword(password);

  const result = await pool.query<SavedUserSensitive>(
    `
      INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *;
    `,
    [String(username), String(password_hash)]
  );

  if (!result?.rows || result?.rows.length === 0) {
    throw new error.HttpError('user could not be created');
  }

  return result.rows[0];
};

const getUserByUsername = async (username: string): Promise<SavedUser> => {
  const result = await pool.query<SavedUser>(
    `
      SELECT id, username FROM users WHERE username = $1
    `,
    [String(username)]
  );

  if (!result?.rows || result?.rows.length === 0) {
    throw new error.NotFoundError('username not found');
  }

  return result.rows[0];
};

const getUserByUsernameSensitive = async (username: string): Promise<SavedUserSensitive> => {
  const result = await pool.query<SavedUserSensitive>(
    `
      SELECT * FROM users WHERE username = $1
    `,
    [String(username)]
  );

  if (!result?.rows || result?.rows.length === 0) {
    throw new error.NotFoundError('username not found');
  }

  return result.rows[0];
};

interface UserId {
  user_id: number;
}

const getUserIdByEntryId = async (entryId: string): Promise<UserId> => {
  console.log(entryId);
  const response = await pool.query<UserId>(
    `
      SELECT user_id FROM learning_entries WHERE id = $1;
    `,
    [Number(entryId)],
  );

  if (!response?.rows || response?.rows.length === 0) {
    throw new error.NotFoundError('user id cannot be found');
  }

  return response.rows[0];
};

export default {
  getAllUsers,
  getAllUsersSensitive,
  getUserById,
  createUser,
  getUserByUsername,
  getUserByUsernameSensitive,
  getUserIdByEntryId,
};