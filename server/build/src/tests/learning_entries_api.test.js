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
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const pool_1 = __importDefault(require("../../db/pool"));
const test_helper_1 = __importDefault(require("./test_helper"));
const api = (0, supertest_1.default)(app_1.default);
// const server = supertest.agent('http://localhost:3000');
const loginUrl = '/api/login';
const entriesUrl = '/api/entries';
(0, node_test_1.before)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield test_helper_1.default.clearUsers();
    yield test_helper_1.default.clearEntries();
    for (const user of test_helper_1.default.defaultUsers) {
        yield test_helper_1.default.insertUserToDb(user.username, user.password);
    }
    for (const entry of test_helper_1.default.defaultEntries) {
        yield test_helper_1.default.insertEntriesIntoDb(entry);
    }
}));
void (0, node_test_1.describe)('GET Requests', () => {
    void (0, node_test_1.test)('/api/entries returns learning entries', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield api
            .get(entriesUrl)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        node_assert_1.default.ok(Array.isArray(result.body));
        node_assert_1.default.strictEqual(result.body.length, test_helper_1.default.defaultEntries.length);
        const topics = result.body.map(e => e.topic);
        (0, node_assert_1.default)(topics.includes(test_helper_1.default.defaultEntries[0].topic));
    }));
    void (0, node_test_1.test)('/api/entries/:id returns one learning entry by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield api
            .get(`${entriesUrl}/1`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        node_assert_1.default.ok(typeof result.body === 'object');
        node_assert_1.default.strictEqual(result.body.topic, test_helper_1.default.defaultEntries[0].topic);
    }));
    void (0, node_test_1.test)('/api/entries/loggedin returns 302 if userid is valid but user not logged in', () => __awaiter(void 0, void 0, void 0, function* () {
        yield api
            .get('/api/entries/loggedin')
            .expect(302);
    }));
});
void (0, node_test_1.describe)('AFTER User Logs In', () => {
    // persist login cookies by calling supertest agent instead of regular supertest
    const agent = supertest_1.default.agent(app_1.default);
    (0, node_test_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield agent
            .post(loginUrl)
            .send({ username: 'default', password: 'password123' })
            .expect(201);
    }));
    void (0, node_test_1.test)('GET /api/entries/loggedin status 200 and returns all entries by user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent
            .get('/api/entries/loggedin')
            .expect(200);
        const userId = response.body[0].user_id;
        const defaultLearningEntries = test_helper_1.default.defaultEntries.filter(e => e.user_id === userId);
        node_assert_1.default.ok(Array.isArray(response.body));
        node_assert_1.default.strictEqual(defaultLearningEntries.length, response.body.length);
    }));
    void (0, node_test_1.test)('POST /api/entries status 201 and returns the created entry', () => __awaiter(void 0, void 0, void 0, function* () {
        const newEntryObject = {
            user_id: 1,
            topic: "string methods",
            note: "learned how to use .find and .rfind methods",
            difficulty: 2,
            minutes_spent: 30
        };
        const entriesAtStart = yield test_helper_1.default.getEntriesInDb(newEntryObject.user_id);
        const response = yield agent
            .post(`${entriesUrl}/loggedin`)
            .send(newEntryObject)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        const entriesAtEnd = yield test_helper_1.default.getEntriesInDb(newEntryObject.user_id);
        const learningEntry = response.body;
        node_assert_1.default.strictEqual(learningEntry.note, newEntryObject.note);
        node_assert_1.default.strictEqual(entriesAtEnd.length, entriesAtStart.length + 1);
    }));
    void (0, node_test_1.test)('DELETE /api/entries/loggedin/:id returns 200 and status success', () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = 1;
        const entriesAtStart = yield test_helper_1.default.getEntriesInDb(userId);
        const entryId = 1;
        yield agent
            .delete(`${entriesUrl}/loggedin/${entryId}`)
            .expect(200);
        const entriesAtEnd = yield test_helper_1.default.getEntriesInDb(userId);
        node_assert_1.default.strictEqual(entriesAtEnd.length, entriesAtStart.length - 1);
    }));
    void (0, node_test_1.test)('PUT /api/entries/loggedin/:id returns 200 and status success', () => __awaiter(void 0, void 0, void 0, function* () {
        const entryId = 3;
        const user_id = 1;
        // updatedEntry doesn't have note and difficulty
        const updatedEntry = {
            user_id,
            topic: 'Django',
            minutes_spent: 30,
        };
        yield agent
            .put(`${entriesUrl}/loggedin/${entryId}`)
            .send(updatedEntry)
            .expect(200);
    }));
    (0, node_test_1.after)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield agent.post('/api/logout');
    }));
});
(0, node_test_1.after)(() => __awaiter(void 0, void 0, void 0, function* () {
    // await test_helper.clearUsers();
    // await test_helper.clearEntries();
    // for (const user of test_helper.defaultUsers) {
    //   await test_helper.insertUserToDb(user.username, user.password);
    // }
    // for (const entry of test_helper.defaultEntries) {
    //   await test_helper.insertEntriesIntoDb(entry);
    // }
    yield pool_1.default.end();
}));
