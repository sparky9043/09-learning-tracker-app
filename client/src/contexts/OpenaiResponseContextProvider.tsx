import { useState } from "react";
import { type OpenaiResponse } from "../types/types";
import { OpenaiResponseContext } from "./OpenaiResponseContext";

interface OpenaiResponseContextProviderProps {
  children: React.ReactNode;
};

const OpenaiResponseContextProvider = ({ children }: OpenaiResponseContextProviderProps) =>  {
  const [openaiResponse, setOpenaiResponse] = useState<OpenaiResponse | null>(null);

  return (
    <OpenaiResponseContext.Provider value={{ openaiResponse, setOpenaiResponse }}>
      {children}
    </OpenaiResponseContext.Provider>
  )
};

export default OpenaiResponseContextProvider;