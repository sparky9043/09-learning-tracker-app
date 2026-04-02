import { Outlet } from "react-router";
import DashboardNav from "../DashboardPage/DashboardNav";
import { useCurrentUserContext } from "@/hooks/useCurrentUserContext";
import DashboardFooter from "../DashboardPage/DashboardFooter";

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
    <div className="bg-background text-on-surface selection:bg-primary-container selection:text-on-primary-container">
      <DashboardNav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Outlet />
      <DashboardFooter />
    </div>
  )
};

export default BoilerplateOutput;