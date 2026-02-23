import { useContext } from "react";
import { OpenaiResponseContext } from "../contexts/OpenaiResponseContext";

const useOpenaiResponseContext = () => {
  const context = useContext(OpenaiResponseContext);

  if (!context) {
    throw new Error('OpenaiResponseContext must be called inside OpenaiResponseContext Provider');
  }

  return context;
};

export default useOpenaiResponseContext;