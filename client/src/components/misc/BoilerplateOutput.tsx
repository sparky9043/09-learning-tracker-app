import { Outlet } from "react-router";
import DashboardNav from "../DashboardPage/DashboardNav";
import { useCurrentUserContext } from "@/hooks/useCurrentUserContext";

const BoilerplateOutput = () => {
  const { currentUser, setCurrentUser } = useCurrentUserContext();

  if (!currentUser) {
    return (
      <div>
        Please login to view this page
      </div>
    )
  }

  return (
    <div className="flex">
      <DashboardNav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Outlet />
    </div>
  )
};

export default BoilerplateOutput;