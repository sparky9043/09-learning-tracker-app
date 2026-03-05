import LearningEntriesList from "./LearningEntriesList";
import { useCurrentUserContext } from "@/hooks/useCurrentUserContext";
import Welcome from "./Welcome";
// import Togglelable from "../misc/Toggleable";

const Dashboard = () => {
  const { currentUser, setCurrentUser } = useCurrentUserContext();

  if (!currentUser) {
    return (
      <div>
        Please login to view this page
      </div>
    )
  }

  return (
    <div className="text-center flex min-h-dvh min-w-dvh">
      <Welcome currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <LearningEntriesList />
    </div>
  )
}

export default Dashboard;