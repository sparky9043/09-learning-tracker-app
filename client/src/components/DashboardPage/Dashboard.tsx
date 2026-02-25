// import { useCurrentUserContext } from "../../hooks/useCurrentUserContext";
import loginService from "../../service/loginService";
import { Link, useNavigate } from "react-router";
import LearningEntriesList from "./LearningEntriesList";
import { Button } from "../ui/button";
// import { useCurrentUserStore } from "@/stores/currentUserStore";
import { useCurrentUserContext } from "@/hooks/useCurrentUserContext";

const Dashboard = () => {
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

  if (!currentUser) {
    <div>
      Please login to view this page
    </div>
  }

  return (
    <div className="text-center flex">
      <div className="bg-stone-900 text-stone-200 p-4">
        {currentUser
          &&
            <h2>
              Welcome Back {currentUser?.username}!
              <Button onClick={handleLogout} variant="outline" className="text-stone-800 bg-stone-200 hover:bg-stone-400 hover:border-stone-400 mb-2">log out</Button>
            </h2>
        }
        <div>
          <p>Having trouble summarizing? Try the AI Summary &rarr;
            <Link to='summarize' className="font-medium p-2 text-stone-800 bg-stone-200 hover:bg-stone-400 rounded-md ml-2"> Click Here </Link>
          </p>
        </div>
      </div>
      <LearningEntriesList />
    </div>
  )
}

export default Dashboard;