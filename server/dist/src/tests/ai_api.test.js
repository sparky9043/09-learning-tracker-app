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
// const api = supertest(app);
const loginUrl = '/api/login';
const baseUrl = '/api/assistant';
void (0, node_test_1.describe)('POST Request to AI', () => {
    const agent = supertest_1.default.agent(app_1.default);
    (0, node_test_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield agent
            .post(loginUrl)
            .send({
            username: 'default',
            password: 'password123',
        });
    }));
    void (0, node_test_1.test)('requests to /api/assistant returns status 201', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent
            .post(baseUrl)
            .send({
            concepts: [
                {
                    id: 20,
                    note: "python methods",
                    topic: "I learned how to use .zip() method to tie several lists together",
                }
            ]
        })
            .expect(201);
        const aiResponse = response.body;
        (0, node_assert_1.default)(Array.isArray(aiResponse.questions));
        node_assert_1.default.strictEqual(aiResponse.questions.length, 1);
        node_assert_1.default.strictEqual(aiResponse.questions[0].concept.length, 3);
    }));
});
(0, node_test_1.after)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield pool_1.default.end();
}));
