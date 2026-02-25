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
      <div className="bg-stone-900 text-stone-200 p-4">
        {currentUser && <Welcome currentUser={currentUser} setCurrentUser={setCurrentUser} />}
      </div>
      <LearningEntriesList />
    </div>
  )
}

export default Dashboard;