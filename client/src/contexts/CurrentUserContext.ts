import { createContext, type SetStateAction } from "react";
import type { User } from "../types/types";

interface CreateUserContextTypes {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<SetStateAction<User | null>>;
}

export const CurrentUserContext = createContext<CreateUserContextTypes | null>(null);