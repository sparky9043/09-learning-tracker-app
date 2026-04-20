"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./utils/config"));
const node_http_1 = __importDefault(require("node:http"));
const server = node_http_1.default.createServer(app_1.default);
server.listen(config_1.default.PORT, () => {
    console.log(`Server running on http://localhost:${config_1.default.PORT}`);
});
