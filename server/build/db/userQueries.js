"use strict";
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
const error_1 = __importDefault(require("../src/errors/error"));
const middleware_1 = __importDefault(require("../src/utils/middleware"));
const pool_1 = __importDefault(require("./pool"));
// user queries
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool_1.default.query(`
      SELECT id, username FROM users;
    `);
    return result.rows;
});
const getAllUsersSensitive = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool_1.default.query(`
      SELECT * FROM users;
    `);
    return result.rows;
});
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (isNaN(Number(id))) {
        throw new error_1.default.ValidationError('id is not a number');
    }
    const result = yield pool_1.default.query(`
      SELECT id, username FROM users WHERE id = $1;
    `, [Number(id)]);
    if (!(result === null || result === void 0 ? void 0 : result.rows) || result.rows.length === 0) {
        throw new error_1.default.NotFoundError('user not found');
    }
    return result.rows[0];
});
const createUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ username, password }) {
    const password_hash = yield middleware_1.default.hashPassword(password);
    const result = yield pool_1.default.query(`
      INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *;
    `, [String(username), String(password_hash)]);
    if (!(result === null || result === void 0 ? void 0 : result.rows) || (result === null || result === void 0 ? void 0 : result.rows.length) === 0) {
        throw new error_1.default.HttpError('user could not be created');
    }
    return result.rows[0];
});
const getUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool_1.default.query(`
      SELECT id, username FROM users WHERE username = $1
    `, [String(username)]);
    if (!(result === null || result === void 0 ? void 0 : result.rows) || (result === null || result === void 0 ? void 0 : result.rows.length) === 0) {
        throw new error_1.default.NotFoundError('username not found');
    }
    return result.rows[0];
});
const getUserByUsernameSensitive = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool_1.default.query(`
      SELECT * FROM users WHERE username = $1
    `, [String(username)]);
    if (!(result === null || result === void 0 ? void 0 : result.rows) || (result === null || result === void 0 ? void 0 : result.rows.length) === 0) {
        throw new error_1.default.NotFoundError('username not found');
    }
    return result.rows[0];
});
const getUserIdByEntryId = (entryId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(entryId);
    const response = yield pool_1.default.query(`
      SELECT user_id FROM learning_entries WHERE id = $1;
    `, [Number(entryId)]);
    if (!(response === null || response === void 0 ? void 0 : response.rows) || (response === null || response === void 0 ? void 0 : response.rows.length) === 0) {
        throw new error_1.default.NotFoundError('user id cannot be found');
    }
    return response.rows[0];
});
exports.default = {
    getAllUsers,
    getAllUsersSensitive,
    getUserById,
    createUser,
    getUserByUsername,
    getUserByUsernameSensitive,
    getUserIdByEntryId,
};
