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
const bcrypt_1 = __importDefault(require("bcrypt"));
const pg_1 = require("pg");
const error_1 = __importDefault(require("../errors/error"));
const learning_entry_schema_1 = require("../schemas/learning-entry-schema");
const zod_1 = require("zod");
const user_schema_1 = require("../schemas/user-schema");
// import { ZodError } from "zod";
// validation middleware
const newLearningEntryValidator = (req, _res, next) => {
    try {
        console.log('validationHandler reached');
        req.body = learning_entry_schema_1.NewLearningEntrySchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
const errorHandler = (err, _req, res, next) => {
    if (err instanceof pg_1.DatabaseError) {
        res.status(500).json({ error: err.message });
    }
    if (err instanceof error_1.default.HttpError) {
        res.status(Number(err.status || 500))
            .json({
            status: 'error',
            message: err.message || 'Internal Server Error',
        });
    }
    if (err instanceof zod_1.ZodError) {
        res.status(400)
            .json({
            status: 'error',
            message: err.message,
        });
    }
    if (err instanceof Error) {
        console.log('inside errorHandler', err.message);
    }
    next();
};
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    const hash = yield bcrypt_1.default.hash(password, saltRounds);
    return hash;
});
const newUserValidator = (req, _res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new error_1.default.ValidationError('both username and password must be filled out');
    }
    req.body = user_schema_1.NewUserSchema.parse({ username, password });
    next();
};
exports.default = {
    errorHandler,
    newLearningEntryValidator,
    hashPassword,
    newUserValidator,
};
