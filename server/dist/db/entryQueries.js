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
const pool_1 = __importDefault(require("./pool"));
const userQueries_1 = __importDefault(require("./userQueries"));
const getLearningEntries = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool_1.default.query(`
      SELECT * FROM learning_entries;
    `);
    return result.rows;
});
const getLearningEntryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool_1.default.query(`
      SELECT * FROM learning_entries WHERE id = $1;
    `, [Number(id)]);
    return result.rows[0];
});
const getAllLearningEntriesByUserId = (userid) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userQueries_1.default.getUserById(Number(userid));
    if (!user) {
        throw new error_1.default.NotFoundError('user not found');
    }
    const result = yield pool_1.default.query(`
      SELECT * FROM learning_entries WHERE user_id = $1;
    `, [Number(userid)]);
    return result.rows;
});
const createLearningEntry = (newEntryObject) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, topic, note, difficulty, minutes_spent, created_at } = newEntryObject;
    const timestamp = created_at ? created_at : 'NOW()';
    // if timestamp is given, use first condition. if not second
    const response = yield pool_1.default.query(`
      INSERT INTO learning_entries (user_id, topic, note, difficulty, minutes_spent, created_at)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `, [Number(user_id), topic, note, Number(difficulty), Number(minutes_spent), timestamp]);
    return response.rows[0];
});
const deleteEntryById = (entryId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield pool_1.default.query(`
      DELETE FROM learning_entries WHERE id = $1;
    `, [Number(entryId)]);
    // throw an error if row count is 0. means nothing got deleted
    if (!response.rowCount || response.rowCount > 1) {
        throw new error_1.default.HttpError('Internal Server Error');
    }
    if (response.rowCount === 0) {
        throw new error_1.default.NotFoundError('delete failed. entry not found');
    }
    return { status: 'success', message: 'entry deleted' };
});
const updateLearningEntry = (entryId, newLearningEntryObject) => __awaiter(void 0, void 0, void 0, function* () {
    const savedEntry = yield getLearningEntryById(entryId);
    const newLearningEntry = Object.assign(Object.assign({}, savedEntry), newLearningEntryObject);
    const { topic, note, difficulty, minutes_spent, created_at, id, user_id } = newLearningEntry;
    const response = yield pool_1.default.query(`
      UPDATE learning_entries
      SET topic = $1, note = $2,difficulty = $3, minutes_spent = $4, created_at = $5
      WHERE id = $6 AND user_id = $7
      RETURNING *;
    `, [topic, note, difficulty, minutes_spent, created_at, id, user_id]);
    if (!response.rows || response.rowCount != 1) {
        throw new error_1.default.NotFoundError('the entry you want to edit was not found');
    }
    return response.rows[0];
});
exports.default = {
    getLearningEntries,
    getLearningEntryById,
    getAllLearningEntriesByUserId,
    createLearningEntry,
    deleteEntryById,
    updateLearningEntry,
};
