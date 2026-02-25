import LearningEntriesList from "./LearningEntriesList";
import { useCurrentUserContext } from "@/hooks/useCurrentUserContext";
import Welcome from "./Welcome";

const Dashboard = () => {
  const { currentUser, setCurrentUser } = useCurrentUserContext();

  if (!currentUser) {
    <div>
      Please login to view this page
    </div>
  }

  return (
    <div className="text-center flex">
      <Welcome currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <LearningEntriesList />
    </div>
  )
}

export default Dashboard;