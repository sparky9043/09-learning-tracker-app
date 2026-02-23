import { createContext, type SetStateAction } from "react";
import type { OpenaiResponse } from "../types/types";

interface OpenaiResponseContextTypes {
  openaiResponse: OpenaiResponse | null;
  setOpenaiResponse: React.Dispatch<SetStateAction<OpenaiResponse | null>>;
};

export const OpenaiResponseContext = createContext<OpenaiResponseContextTypes | null>(null);