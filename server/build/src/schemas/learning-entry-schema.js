"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIGenerateStudyQuestionResponseSchema = exports.AIGeneratedQuestionSchema = exports.AIGenerateStudyQuestionRequestSchema = exports.AIUserEntryInputSchema = exports.LearningEntryOpenAIResponseSchema = exports.NewLearningEntrySchema = void 0;
const zod_1 = require("zod");
exports.NewLearningEntrySchema = zod_1.z.object({
    user_id: zod_1.z.number(),
    topic: zod_1.z.string(),
    note: zod_1.z.string(),
    difficulty: zod_1.z.number().min(1, "difficulty must be at least 1").max(5, "difficulty must be smaller than 5"),
    minutes_spent: zod_1.z.number().min(1, "minutes spent must be at least 1"),
    created_at: zod_1.z.string().optional(),
});
exports.LearningEntryOpenAIResponseSchema = zod_1.z.object({
    topic: zod_1.z.string(),
    note: zod_1.z.string(),
});
exports.AIUserEntryInputSchema = zod_1.z.object({
    id: zod_1.z.number(),
    topic: zod_1.z.string(),
    note: zod_1.z.string(),
});
exports.AIGenerateStudyQuestionRequestSchema = zod_1.z.object({
    concepts: zod_1.z.array(exports.AIUserEntryInputSchema),
});
exports.AIGeneratedQuestionSchema = zod_1.z.object({
    question: zod_1.z.string(),
});
exports.AIGenerateStudyQuestionResponseSchema = zod_1.z.object({
    questions: zod_1.z.array(zod_1.z.object({
        topic: zod_1.z.string(),
        concept: zod_1.z.array(exports.AIGeneratedQuestionSchema)
    })),
});
