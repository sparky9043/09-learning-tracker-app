import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';
import type { User } from "../types/types";

interface CurrentUserStore {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

// export const useCurrentUserStore = create<CurrentUserStore>()((set) => ({
//   currentUser: null,
//   setCurrentUser: (user) => set({ currentUser: user }),
// }));

export const useCurrentUserStore = create<CurrentUserStore>()(
  persist(
    (set, get) => ({
      currentUser: null,
      setCurrentUser: () => set({ currentUser: get().currentUser }),
    }),
    {
      name: 'lastSavedUser',
      storage: createJSONStorage(() => localStorage)
    },
  )
)