"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewUserPasswordHashedSchema = exports.NewUserSchema = void 0;
const zod_1 = require("zod");
exports.NewUserSchema = zod_1.z.object({
    username: zod_1.z.string().min(3),
    password: zod_1.z.string().min(3),
});
exports.NewUserPasswordHashedSchema = zod_1.z.object({
    username: zod_1.z.string().min(3),
    password_hash: zod_1.z.string().min(3),
});
