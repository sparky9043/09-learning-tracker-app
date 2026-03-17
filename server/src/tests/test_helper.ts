import pool from "../../db/pool";
import type { LearningEntry, NewLearningEntry, SavedUserSensitive } from "../types/types";
import middleware from "../utils/middleware";
import * as data from './entries.json';

interface JsonEntries {
  entries: NewLearningEntry[];
};

// user helper
const defaultUsers = [
  { username: 'default',  password: 'password123' },
  { username: 'text',     password: 'test123'     },
  { username: 'robot',    password: 'robot123'    },
];

const clearUsers = async (): Promise<void> => {
  await pool.query(
    `
      TRUNCATE TABLE users RESTART IDENTITY CASCADE;
    `
  );
};

const getUsersInDb = async (): Promise<SavedUserSensitive[]> => {
  const response = await pool.query<SavedUserSensitive>(
    `
      SELECT * FROM users
    `
  );
  
  return response.rows;
};

const insertUserToDb = async (username: string, password: string): Promise<void> => {
  const password_hash = await middleware.hashPassword(password);
  await pool.query(
    `
      INSERT INTO users (username, password_hash)
      VALUES ($1, $2); 
    `,
    [String(username), String(password_hash)]
  );
};

// entries helper

const defaultEntries = (data as JsonEntries).entries;
// const defaultEntries = [
//   {
//     user_id: 1,
//     topic: 'PostgreSQL basics',
//     note: 'Learned difference between SERIAL and IDENTITY and how sequences work',
//     difficulty: 3,
//     minutes_spent: 45,
//     created_at: '2026-01-02T08:14:33.482Z'
//   },
//   {
//     user_id: 1,
//     topic: 'SQL GROUP BY',
//     note: 'Practiced GROUP BY vs HAVING and why WHERE runs first',
//     difficulty: 4,
//     minutes_spent: 60,
//     created_at: '2026-01-05T18:42:11.907Z'
//   },
//   {
//     user_id: 1,
//     topic: 'WSL2 + PostgreSQL',
//     note: 'Finally understood how psql connects to the running Postgres service in WSL',
//     difficulty: 3,
//     minutes_spent: 30,
//     created_at: '2026-01-08T07:25:49.163Z'
//   },
//   {
//     user_id: 1,
//     topic: 'Node.js pg Pool',
//     note: 'Configured pg Pool and clarified why DB works even when terminal is closed',
//     difficulty: 2,
//     minutes_spent: 25,
//     created_at: '2026-01-11T21:03:17.554Z'
//   },
//   {
//     user_id: 1,
//     topic: 'Learning project planning',
//     note: 'Struggled with motivation but picked a concrete micro project and schema',
//     difficulty: 2,
//     minutes_spent: 20,
//     created_at: '2026-01-14T13:37:58.291Z'
//   },
//   {
//     user_id: 2,
//     topic: 'Express routing',
//     note: 'Refactored routes into separate router files and reduced duplication',
//     difficulty: 3,
//     minutes_spent: 50,
//     created_at: '2026-01-17T16:55:02.740Z'
//   },
//   {
//     user_id: 2,
//     topic: 'Authentication basics',
//     note: 'Reviewed sessions vs JWT and when each makes sense',
//     difficulty: 4,
//     minutes_spent: 40,
//     created_at: '2026-01-20T10:08:44.019Z'
//   },
//   {
//     user_id: 2,
//     topic: 'PostgreSQL joins',
//     note: 'Practiced INNER vs LEFT JOIN and how missing rows affect results',
//     difficulty: 4,
//     minutes_spent: 55,
//     created_at: '2026-01-23T19:29:36.875Z'
//   },
//   {
//     user_id: 2,
//     topic: 'Error handling',
//     note: 'Added centralized error middleware in Express',
//     difficulty: 3,
//     minutes_spent: 35,
//     created_at: '2026-01-27T08:17:05.336Z'
//   },
//   {
//     user_id: 2,
//     topic: 'SQL indexing',
//     note: 'Learned when indexes help and why too many can hurt performance',
//     difficulty: 5,
//     minutes_spent: 45,
//     created_at: '2026-01-30T22:41:50.602Z'
//   },
//   {
//     user_id: 3,
//     topic: 'JavaScript closures',
//     note: 'Finally clicked how closures retain access to outer scope',
//     difficulty: 4,
//     minutes_spent: 30,
//     created_at: '2026-02-03T10:44:27.148Z'
//   },
//   {
//     user_id: 3,
//     topic: 'Async / Await',
//     note: 'Refactored promise chains into async/await for readability',
//     difficulty: 2,
//     minutes_spent: 25,
//     created_at: '2026-02-07T18:26:49.993Z'
//   },
//   {
//     user_id: 3,
//     topic: 'Debugging mindset',
//     note: 'Focused on reproducing bugs instead of guessing fixes',
//     difficulty: 3,
//     minutes_spent: 20,
//     created_at: '2026-02-12T06:38:11.257Z'
//   },
//   {
//     user_id: 3,
//     topic: 'Authentication and authorization',
//     note: 'Learned about the basics of authorization',
//     difficulty: 4,
//     minutes_spent: 120,
//     created_at: '2026-02-18T15:57:03.684Z'
//   },
// ];

const clearEntries = async (): Promise<void> => {
  await pool.query(
    `
      TRUNCATE TABLE learning_entries RESTART IDENTITY CASCADE;
    `
  );
};

const insertEntriesIntoDb = async (newEntryObject: NewLearningEntry): Promise<void> => {
  const { user_id, topic, note, difficulty, minutes_spent, created_at } = newEntryObject;
  await pool.query(
    `
      INSERT INTO learning_entries (user_id, topic, note, difficulty, minutes_spent, created_at)
      VALUES ($1, $2, $3, $4, $5, $6);
    `,
    [Number(user_id), topic, note, Number(difficulty), Number(minutes_spent), created_at],
  );
};

const getEntriesInDb = async (userid: number): Promise<LearningEntry[]> => {
  const response = await pool.query<LearningEntry>(
    `
      SELECT * FROM learning_entries WHERE user_id = $1;
    `,
    [Number(userid)],
  );

  return response.rows;
};

export default {
  defaultUsers,
  clearUsers,
  insertUserToDb,
  getUsersInDb,
  defaultEntries,
  clearEntries,
  insertEntriesIntoDb,
  getEntriesInDb,
};