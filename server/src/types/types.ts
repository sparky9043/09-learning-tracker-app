import z from "zod";
import { LearningEntryOpenAIResponseSchema, NewLearningEntrySchema } from "../schemas/learning-entry-schema";
import { NewUserPasswordHashedSchema, NewUserSchema } from "../schemas/user-schema";

// user types
// export interface NewUser {
//   username: string;
//   password: string;
// }
export type NewUser = z.infer<typeof NewUserSchema>;

export type NewUserPasswordHashed = z.infer<typeof NewUserPasswordHashedSchema>;

export interface SavedUser {
  id: string;
  username: string;
}

export interface SavedUserSensitive extends SavedUser {
  password_hash: string;
}

// entries types
// export interface NewLearningEntry {
//   user_id: number,
//   topic: string;
//   note: string;
//   difficulty: number;
//   minutes_spent: number;
//   created_at?: string;
// };
export type NewLearningEntry = z.infer<typeof NewLearningEntrySchema>;

export interface LearningEntry extends NewLearningEntry {
  id: number;
}

export interface ResponseStatus {
  status: 'success' | 'error';
  message?: string;
}

export interface ErrorResponseStatus extends ResponseStatus {
  status: 'error';
  message: string;
}

export interface LoginResponseStatus extends ResponseStatus {
  status: 'success';
  user: Express.User;
}

export interface UserPrompt {
  prompt: string;
}

// Separate Types for Interacting With AI Assistant
export interface AIUserEntryInput {
  topic: string;
  note: string;
};

export interface AIGenerateStudyQuestionRequest {
  concepts: AIUserEntryInput[];
};

export type OpenAIResponseSingleEntry = z.infer<typeof LearningEntryOpenAIResponseSchema>;