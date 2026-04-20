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
const baseUrl = '/api/users';
(0, node_test_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield test_helper_1.default.clearUsers();
    for (const user of test_helper_1.default.defaultUsers) {
        yield test_helper_1.default.insertUserToDb(user.username, user.password);
    }
}));
void (0, node_test_1.describe)('GET Requests', () => {
    void (0, node_test_1.test)('/api/users returns default users', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api
            .get(baseUrl)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        node_assert_1.default.ok(Array.isArray(response.body));
        node_assert_1.default.strictEqual(response.body.length, test_helper_1.default.defaultUsers.length);
        const usernames = response.body.map(u => u.username);
        (0, node_assert_1.default)(usernames.includes(test_helper_1.default.defaultUsers[0].username));
        (0, node_assert_1.default)(usernames.includes(test_helper_1.default.defaultUsers[1].username));
    }));
    void (0, node_test_1.test)('/api/users/id returns one user by id', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const response = yield api
            .get(`${baseUrl}/1`)
            .expect(200);
        (0, node_assert_1.default)(Object.keys(response.body).includes('username'));
        node_assert_1.default.strictEqual(test_helper_1.default.defaultUsers[0].username, (_a = response.body) === null || _a === void 0 ? void 0 : _a.username);
        node_assert_1.default.strictEqual(1, 1);
    }));
    void (0, node_test_1.test)('/api/users/id throws error if id is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidId = 'invalid';
        const response = yield api
            .get(`${baseUrl}/${invalidId}`)
            .expect(400);
        (0, node_assert_1.default)(response.body.message.includes('invalid'));
    }));
    void (0, node_test_1.test)('/api/users/id throws error if id is valid but nonexistent', () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistent = 9000;
        const response = yield api
            .get(`${baseUrl}/${nonExistent}`)
            .expect(404);
        (0, node_assert_1.default)(response.body.message.includes('not found'));
    }));
});
void (0, node_test_1.describe)('POST Requests', () => {
    void (0, node_test_1.test)('/api/users creates new user with proper object', () => __awaiter(void 0, void 0, void 0, function* () {
        const usersAtStart = yield test_helper_1.default.getUsersInDb();
        const newUserEntry = {
            username: 'huggies',
            password: 'bears123',
        };
        const response = yield api
            .post(baseUrl)
            .send(newUserEntry)
            .expect(201);
        const usersAtEnd = yield test_helper_1.default.getUsersInDb();
        (0, node_assert_1.default)(usersAtEnd.map(u => u.username).includes(newUserEntry.username));
        node_assert_1.default.strictEqual(response.body.username, newUserEntry.username);
        node_assert_1.default.strictEqual(usersAtEnd.length, usersAtStart.length + 1);
    }));
    void (0, node_test_1.test)('/api/users throws error if username or password is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const usersAtStart = yield test_helper_1.default.getUsersInDb();
        const badUsers = [
            {
                username: 'baduser1', // no password
            },
            {
                password: 'baduser2', // no username
            },
        ];
        for (const user of badUsers) {
            const response = yield api
                .post(baseUrl)
                .send(user)
                .expect(400);
            node_assert_1.default.ok(typeof response.body === 'object');
            node_assert_1.default.strictEqual(response.type, 'application/json');
        }
        const usersAtEnd = yield test_helper_1.default.getUsersInDb();
        // users array doesn't change in length
        node_assert_1.default.strictEqual(usersAtEnd.length, usersAtStart.length);
    }));
});
(0, node_test_1.after)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield pool_1.default.end();
}));
