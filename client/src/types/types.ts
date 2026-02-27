export interface User {
  id: number;
  username: string;
}

export interface SavedUserResponseObject {
  status: 'success' | 'error',
  user: User;
}

export interface UserCredential {
  username: string;
  password: string;
}

// Entries expected when user submits
export interface NewLearningEntry {
  user_id: number;
  topic: string;
  note: string;
  difficulty: number;
  minutes_spent: number;
  created_at?: string;
}

// Entries once submitted
export interface SavedLearningEntry extends NewLearningEntry {
  id: number;
  created_at: string;
}

export interface UserPrompt {
  prompt: string;
}

export interface OpenaiResponse {
  topic: string;
  note: string;
}

export interface AIUserEntryInput {
  note: string;
  topic: string;
};