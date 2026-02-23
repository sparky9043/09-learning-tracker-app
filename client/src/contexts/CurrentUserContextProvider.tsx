import { useState } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import type { User } from "../types/types";

interface CurrentUserContextProviderProps {
  children: React.ReactNode;
};

const CurrentUserContextProvider = ({ children }: CurrentUserContextProviderProps) => {
  const lastSavedUser = JSON.parse(localStorage.getItem('lastSavedUser')!);
  const [currentUser, setCurrentUser] = useState<User | null>(lastSavedUser);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
};

export default CurrentUserContextProvider