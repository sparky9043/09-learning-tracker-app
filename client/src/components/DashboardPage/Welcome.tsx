import loginService from "@/service/loginService";
import type { User } from "@/types/types";
import { Link, useNavigate } from "react-router";
import { Button } from "../ui/button";

interface WelcomeProps {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
}

const Welcome = ({ currentUser, setCurrentUser }: WelcomeProps) => {
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

  if (!currentUser || !currentUser?.username) return null;


  return (
    <div className="bg-stone-900 text-stone-200 p-8">
      <div className="w-25">
        <div>
          <h1>Welcome {currentUser.username}</h1>
        </div>
        <div>
          <Button onClick={handleLogout} variant="outline" className="text-stone-800 bg-stone-200 hover:bg-stone-400 hover:border-stone-400 mb-2">log out</Button>
        </div>
        <div>
          <p>Try the AI Summary!
          </p>
          <Link
            to='summarize'
            className="font-sm p-2 text-stone-800 bg-stone-200 hover:bg-stone-400 rounded-md ml-2"
            >
            Click Here
          </Link>
        </div>
      </div>
    </div>
  )
};

export default Welcome;