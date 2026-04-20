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
const entryQueries_1 = __importDefault(require("../../db/entryQueries"));
const error_1 = __importDefault(require("../errors/error"));
const middleware_1 = __importDefault(require("../utils/middleware"));
const userQueries_1 = __importDefault(require("../../db/userQueries"));
const openaiQuery_1 = __importDefault(require("../../openai/openaiQuery"));
const entryRouter = (0, express_1.Router)();
entryRouter.post('/ai/summarize', // OPENAI API ROUTE
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt } = req.body;
    const responseAI = yield openaiQuery_1.default.getAISummaryResponse(prompt);
    if (!responseAI.note || !responseAI.topic) {
        throw new error_1.default.ValidationError('openai should return both the note and the title of the topic');
    }
    return res.status(201).json(responseAI);
}));
entryRouter.get('/', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const learningEntries = yield entryQueries_1.default.getLearningEntries();
        res.json(learningEntries);
    }
    catch (error) {
        next(error);
    }
}));
// read more about redirect and then see if you can do it correctly
entryRouter.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const learningEntries = yield entryQueries_1.default.getAllLearningEntriesByUserId(Number(userId));
        res.json(learningEntries);
    }
    catch (error) {
        next(error);
    }
}));
entryRouter.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (isNaN(Number(req.params.id))) {
            throw new error_1.default.ValidationError('invalid format id');
        }
        const learningEntry = yield entryQueries_1.default.getLearningEntryById(Number(req.params.id));
        res.json(learningEntry);
    }
    catch (error) {
        next(error);
    }
}));
entryRouter.post('/', middleware_1.default.newLearningEntryValidator, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const savedLearningEntry = yield entryQueries_1.default.createLearningEntry(req.body);
        res.status(201).json(savedLearningEntry);
    }
    catch (error) {
        next(error);
    }
}));
entryRouter.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const savedUserId = yield userQueries_1.default.getUserIdByEntryId(req.params.id);
        if (Number(savedUserId.user_id) !== Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
            throw new error_1.default.ForbiddenError('access forbidden. user id does not match');
        }
        const result = yield entryQueries_1.default.deleteEntryById(Number(req.params.id));
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
}));
entryRouter.put('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const savedUserId = yield userQueries_1.default.getUserIdByEntryId(req.params.id);
        if (Number(savedUserId.user_id) !== Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
            throw new error_1.default.ForbiddenError('access forbidden. user id does not match');
        }
        const savedEntry = yield entryQueries_1.default.updateLearningEntry(Number(req.params.id), req.body);
        res.send(savedEntry);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = entryRouter;
