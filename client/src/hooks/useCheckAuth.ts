import { useEffect } from "react";
import { useNavigate } from "react-router";
import type { User } from "../types/types";
import loginService from "../service/loginService";

const useCheckAuth = (currentUser: User | null): void => {
  const navigate = useNavigate();
  useEffect(() => {
    void (async () => {
      if (!currentUser) {
        await loginService.logout();
        navigate('/login');
      }
    })();
    
  }, [currentUser, navigate]);
};

export  default useCheckAuth;