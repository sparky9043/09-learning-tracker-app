import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;

const DATABASE_NAME = process.env.DATABASE_NAME;

const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

const DATABASE_USER = process.env.DATABASE_USER;

const SESSION_SECRET = process.env.SESSION_SECRET;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const SUPABASE_DB_PASSWORD = process.env.SUPABASE_DB_PASSWORD;

export default {
  PORT,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_USER,
  SESSION_SECRET,
  OPENAI_API_KEY,
  SUPABASE_DB_PASSWORD,
};