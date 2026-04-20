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
const openaiQuery_1 = __importDefault(require("../../openai/openaiQuery"));
const error_1 = __importDefault(require("../errors/error"));
const assistant = (0, express_1.Router)();
// assistant.get('/', (_req: Request, res: Response, next: NextFunction) => {
//   try {
//     res.send('connected');
//   } catch (error) {
//     next(error);
//   }
// });
assistant.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.redirect('/authrequired');
        }
        const { concepts } = req.body;
        if (!concepts || !Array.isArray(concepts) || concepts.length == 0 || concepts.some(concept => !concept.note || !concept.topic)) {
            throw new error_1.default.ValidationError('please submit the proper format of note and topic');
        }
        const generatedQuestions = yield openaiQuery_1.default.getAIGeneratedQuestions(concepts);
        res.status(201).json(generatedQuestions);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = assistant;
