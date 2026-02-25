import { Pool } from "pg";
import config from "../src/utils/config";

// const pool = new Pool({
//   host: 'localhost',
//   user: config.DATABASE_USER,
//   database: config.DATABASE_NAME,
//   password: config.DATABASE_PASSWORD,
//   port: 5432,
// });

const connectionString = `postgresql://postgres.tatesxfpnjmobhrzafnz:${config.SUPABASE_DB_PASSWORD}@aws-1-ap-south-1.pooler.supabase.com:5432/postgres`;

const pool = new Pool({
  connectionString,
});

export default pool;