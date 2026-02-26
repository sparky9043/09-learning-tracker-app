import LearningEntriesList from "./LearningEntriesList";
import { useCurrentUserContext } from "@/hooks/useCurrentUserContext";
import Welcome from "./Welcome";
import Togglelable from "../misc/Toggleable";

const Dashboard = () => {
  const { currentUser, setCurrentUser } = useCurrentUserContext();

  if (!currentUser) {
    <div>
      Please login to view this page
    </div>
  }

  return (
    <div className="text-center flex min-h-dvh">
      <Togglelable text="expand" className="bg-neutral-900">
        <Welcome currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </Togglelable>
      <LearningEntriesList />
    </div>
  )
}

export default Dashboard;