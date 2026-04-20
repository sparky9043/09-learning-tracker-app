import { useNavigate } from "react-router";
import { useCurrentUserContext } from "@/hooks/useCurrentUserContext";
import loginService from "@/service/loginService";

interface LogoutButtonProps {
  children?: string;
}

const LogoutButton = ({ children = 'logout' } : LogoutButtonProps) => {
  const { currentUser, setCurrentUser } = useCurrentUserContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (currentUser) {
        localStorage.removeItem('lastSavedUser');
        setCurrentUser(null);
        await loginService.logout();
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button onClick={handleLogout}>{children}</button>
  )
}

export default LogoutButton;