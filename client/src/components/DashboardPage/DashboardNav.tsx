import loginService from "@/service/loginService";
import type { User } from "@/types/types";
import { Link, useNavigate } from "react-router";
import { Button } from "../ui/button";

interface DashboardNavProps {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
}

const DashboardNav = ({ currentUser, setCurrentUser }: DashboardNavProps) => {
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
    <div className="bg-stone-900 text-stone-200 p-2 min-w-50">
      <div>
        <div>
          <h1>Welcome {currentUser.username}</h1>
        </div>
        <div>
          <Button onClick={handleLogout} variant="outline" className="text-stone-200 bg-transparent mb-2 border-none hover:bg-transparent hover:text-stone-200 hover:font-bold">Log Out</Button>
        </div>
        <ul>
          <li className="mt-4 mb-4">
            <Link
              to='summarize'
              className="font-sm p-2 text-stone-100 hover:font-bold bg-transparent rounded-md ml-2"
            >
              AI Summary
            </Link>
          </li>
          <li className="mt-4 mb-4">
            <Link to='ai-assistant' className="font-sm p-2 text-stone-100 hover:font-bold bg-transparent rounded-md ml-2">
              Generate Questions
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
};

export default DashboardNav;