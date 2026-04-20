"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
const config_1 = __importDefault(require("../src/utils/config"));
const openai = new openai_1.default({
    apiKey: config_1.default.OPENAI_API_KEY,
});
exports.default = openai;
