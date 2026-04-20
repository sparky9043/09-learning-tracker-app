"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const config_1 = __importDefault(require("../src/utils/config"));
// const pool = new Pool({
//   host: 'localhost',
//   user: config.DATABASE_USER,
//   database: config.DATABASE_NAME,
//   password: config.DATABASE_PASSWORD,
//   port: 5432,
// });
const connectionString = `postgresql://postgres.tatesxfpnjmobhrzafnz:${config_1.default.SUPABASE_DB_PASSWORD}@aws-1-ap-south-1.pooler.supabase.com:5432/postgres`;
const pool = new pg_1.Pool({
    connectionString,
});
exports.default = pool;
