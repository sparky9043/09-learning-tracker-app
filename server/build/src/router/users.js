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
const express_1 = require("express");
const userQueries_1 = __importDefault(require("../../db/userQueries"));
// import { DatabaseError } from "pg";
const error_1 = __importDefault(require("../errors/error"));
const middleware_1 = __importDefault(require("../utils/middleware"));
const usersRouter = (0, express_1.Router)();
// get all users
usersRouter.get('/', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userQueries_1.default.getAllUsers();
        res.json(users);
    }
    catch (error) {
        next(error);
    }
}));
usersRouter.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (isNaN(req.params.id)) {
            throw new error_1.default.ValidationError('invalid id format');
        }
        const user = yield userQueries_1.default.getUserById(Number(req.params.id));
        if (!user) {
            throw new error_1.default.NotFoundError('user not found');
        }
        else {
            res.json(user);
        }
    }
    catch (error) {
        next(error);
    }
}));
// create new user
usersRouter.post('/', middleware_1.default.newUserValidator, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userQueries_1.default.createUser(req.body);
        if (user) {
            res.status(201).json(user);
        }
        else {
            throw new error_1.default.HttpError('user could not be created');
        }
    }
    catch (error) {
        next(error);
    }
}));
exports.default = usersRouter;
