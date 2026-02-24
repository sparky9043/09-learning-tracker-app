import error from "../src/errors/error";
import { LearningEntry, NewLearningEntry, ResponseStatus } from "../src/types/types";
import pool from "./pool";
import userQueries from "./userQueries";

const getLearningEntries = async (): Promise<LearningEntry[]> => {
  const result = await pool.query<LearningEntry>(
    `
      SELECT * FROM learning_entries;
    `,
  );
  return result.rows;
};

const getLearningEntryById = async (id: number): Promise<LearningEntry> => {
  const result = await pool.query<LearningEntry>(
    `
      SELECT * FROM learning_entries WHERE id = $1;
    `,
    [Number(id)],
  );

  return result.rows[0];
};

const getAllLearningEntriesByUserId = async (userid: number): Promise<LearningEntry[]> => {
  const user = await userQueries.getUserById(Number(userid));

  if (!user) {
    throw new error.NotFoundError('user not found');
  }

  const result = await pool.query<LearningEntry>(
    `
      SELECT * FROM learning_entries WHERE user_id = $1;
    `,
    [Number(userid)],
  );

  return result.rows;
};

const createLearningEntry = async (newEntryObject: NewLearningEntry): Promise<LearningEntry> => {
  const { user_id, topic, note, difficulty, minutes_spent, created_at } = newEntryObject;

  const timestamp = created_at ? created_at : 'NOW()';

  // if timestamp is given, use first condition. if not second
  const response = await pool.query<LearningEntry>(
    `
      INSERT INTO learning_entries (user_id, topic, note, difficulty, minutes_spent, created_at)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `,
    [Number(user_id), topic, note, Number(difficulty), Number(minutes_spent), timestamp],
  );

  return response.rows[0];
};

const deleteEntryById = async (entryId: number): Promise<ResponseStatus> => {
  const response = await pool.query(
    `
      DELETE FROM learning_entries WHERE id = $1;
    `,
    [Number(entryId)],
  );

  // throw an error if row count is 0. means nothing got deleted

  if (!response.rowCount || response.rowCount > 1) {
    throw new error.HttpError('Internal Server Error');
  }

  if (response.rowCount === 0) {
    throw new error.NotFoundError('delete failed. entry not found');
  }

  return { status: 'success', message: 'entry deleted' };
};

const updateLearningEntry = async (entryId: number, newLearningEntryObject: NewLearningEntry):  Promise<LearningEntry> => {
  const savedEntry = await getLearningEntryById(entryId);

  const newLearningEntry = {
    ...savedEntry,
    ...newLearningEntryObject,
  };

  const { topic, note, difficulty, minutes_spent, created_at, id, user_id } = newLearningEntry;

  const response = await pool.query<LearningEntry>(
    `
      UPDATE learning_entries
      SET topic = $1, note = $2,difficulty = $3, minutes_spent = $4, created_at = $5
      WHERE id = $6 AND user_id = $7
      RETURNING *;
    `,
    [topic, note, difficulty, minutes_spent, created_at, id, user_id]
  );

  if (!response.rows || response.rowCount != 1) {
    throw new error.NotFoundError('the entry you want to edit was not found');
  }

  return response.rows[0];
};

export default {
  getLearningEntries,
  getLearningEntryById,
  getAllLearningEntriesByUserId,
  createLearningEntry,
  deleteEntryById,
  updateLearningEntry,
};