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
const error_1 = __importDefault(require("../src/errors/error"));
const learning_entry_schema_1 = require("../src/schemas/learning-entry-schema");
const openai_1 = __importDefault(require("./openai"));
const zod_1 = require("openai/helpers/zod");
const getAISummaryResponse = (userPrompt) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield openai_1.default.responses.parse({
        model: 'gpt-5-mini',
        input: [
            {
                role: 'system',
                content: 'You are an efficient summarizer of learned topics. Summarize what the user learned into 2 categories: 1) A suitable "title" of the topic learned and 2) "note" which is a one-sentence summary of what the user learned. If the summary covers more two topics, you can use two stentences at most. Do not refer to the user as "you". Use "I"',
            }, {
                role: 'user',
                content: userPrompt,
            }
        ],
        text: {
            format: (0, zod_1.zodTextFormat)(learning_entry_schema_1.LearningEntryOpenAIResponseSchema, 'learning_entry_response'),
        },
    });
    const learning_entry_response = response.output_parsed;
    if (!learning_entry_response) {
        throw new error_1.default.HttpError('Internal Server Error.');
    }
    return learning_entry_response;
});
const getAIGeneratedQuestions = (userEntries) => __awaiter(void 0, void 0, void 0, function* () {
    const entriesString = JSON.stringify(userEntries);
    const response = yield openai_1.default.responses.parse({
        model: 'gpt-5-mini',
        input: [
            {
                role: 'system',
                content: 'You are an effective generator of study guide questions. You will be receiving a stringified JSON. The JSON has only one property named "concepts" and will be an array of objects each with topic and note keys. Treat each of these as one concept that the user learned. Read each of the title and note and generate 3 questions for each concept that the user sent. Make sure each question does not exceed 100 characters. Your response is an object with one key named "questions". The array will have the same number of concepts sent by the user. Each member of the array will consist of the topic sent by the user and the concept which will contain the 3 questions per topic.',
            },
            {
                role: 'user',
                content: entriesString,
            }
        ],
        text: {
            format: (0, zod_1.zodTextFormat)(learning_entry_schema_1.AIGenerateStudyQuestionResponseSchema, 'generated_questions_response'),
        },
    });
    const generated_questions_response = response.output_parsed;
    if (!generated_questions_response) {
        throw new error_1.default.HttpError('Internal Server Error');
    }
    return generated_questions_response;
});
exports.default = { getAISummaryResponse, getAIGeneratedQuestions };
