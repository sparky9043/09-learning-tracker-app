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
console.log(api);
(0, node_test_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield test_helper_1.default.clearUsers();
    for (const user of test_helper_1.default.defaultUsers) {
        yield test_helper_1.default.insertUserToDb(user.username, user.password);
    }
}));
void (0, node_test_1.describe)('GET requests', () => {
    void (0, node_test_1.test)('this is a test', () => {
        node_assert_1.default.strictEqual(1, 1);
    });
});
(0, node_test_1.after)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield pool_1.default.end();
}));
