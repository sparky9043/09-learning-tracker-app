import { z } from "zod";

export const NewLearningEntrySchema = z.object({
  user_id: z.number(),
  topic: z.string(),
  note: z.string(),
  difficulty: z.number().min(1, "difficulty must be at least 1").max(5, "difficulty must be smaller than 5"),
  minutes_spent: z.number().min(1, "minutes spent must be at least 1"),
  created_at: z.string().optional(),
});

export const LearningEntryOpenAIResponseSchema = z.object({
  topic: z.string(),
  note: z.string(),
});

export const AIUserEntryInputSchema = z.object({
  topic: z.string(),
  note: z.string(),
});

export const AIGenerateStudyQuestionRequestSchema = z.object({
  concepts: z.array(AIUserEntryInputSchema),
});