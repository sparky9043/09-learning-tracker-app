import { create } from "zustand";
import type { OpenaiResponse } from "../types/types";

interface OpenaiResponseStore {
  openaiResponse: OpenaiResponse | null;
  setOpenaiResponse: (response: OpenaiResponse | null) => void;
}

const useOpenaiResponseStore = create<OpenaiResponseStore>()((set) => ({
  openaiResponse: null,
  setOpenaiResponse: (response) => set({ openaiResponse: response }),
}));

export default useOpenaiResponseStore;