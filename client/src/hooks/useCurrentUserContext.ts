import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export const useCurrentUserContext = () => {
  const context = useContext(CurrentUserContext);

  if (!context) {
    throw new Error('CurrentUserContext must be used inside CurrentUserContext Provider');
  }

  return context;
};