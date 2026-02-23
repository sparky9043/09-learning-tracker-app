import { Pool } from "pg";
import config from "../src/utils/config";

const pool = new Pool({
  host: 'localhost',
  user: config.DATABASE_USER,
  database: config.DATABASE_NAME,
  password: config.DATABASE_PASSWORD,
  port: 5432,
});

export default pool;