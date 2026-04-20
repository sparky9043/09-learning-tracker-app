"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pool_1 = __importDefault(require("../../db/pool"));
const middleware_1 = __importDefault(require("../utils/middleware"));
const data = __importStar(require("./entries.json"));
;
// user helper
const defaultUsers = [
    { username: 'default', password: 'password123' },
    { username: 'text', password: 'test123' },
    { username: 'robot', password: 'robot123' },
];
const clearUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    yield pool_1.default.query(`
      TRUNCATE TABLE users RESTART IDENTITY CASCADE;
    `);
});
const getUsersInDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield pool_1.default.query(`
      SELECT * FROM users
    `);
    return response.rows;
});
const insertUserToDb = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const password_hash = yield middleware_1.default.hashPassword(password);
    yield pool_1.default.query(`
      INSERT INTO users (username, password_hash)
      VALUES ($1, $2); 
    `, [String(username), String(password_hash)]);
});
// entries helper
const defaultEntries = data.entries;
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
const clearEntries = () => __awaiter(void 0, void 0, void 0, function* () {
    yield pool_1.default.query(`
      TRUNCATE TABLE learning_entries RESTART IDENTITY CASCADE;
    `);
});
const insertEntriesIntoDb = (newEntryObject) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, topic, note, difficulty, minutes_spent, created_at } = newEntryObject;
    yield pool_1.default.query(`
      INSERT INTO learning_entries (user_id, topic, note, difficulty, minutes_spent, created_at)
      VALUES ($1, $2, $3, $4, $5, $6);
    `, [Number(user_id), topic, note, Number(difficulty), Number(minutes_spent), created_at]);
});
const getEntriesInDb = (userid) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield pool_1.default.query(`
      SELECT * FROM learning_entries WHERE user_id = $1;
    `, [Number(userid)]);
    return response.rows;
});
exports.default = {
    defaultUsers,
    clearUsers,
    insertUserToDb,
    getUsersInDb,
    defaultEntries,
    clearEntries,
    insertEntriesIntoDb,
    getEntriesInDb,
};
