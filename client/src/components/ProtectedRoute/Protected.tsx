import { Outlet } from "react-router";
import useCheckAuth from "../../hooks/useCheckAuth";
import { useCurrentUserContext } from "../../hooks/useCurrentUserContext";
// import { useCurrentUserStore } from "@/stores/currentUserStore";

const Protected = () => {
  const { currentUser } = useCurrentUserContext();
  void useCheckAuth(currentUser);
  console.log('Protected Route', currentUser);

  return (
    <Outlet />
  )
}

export default Protected;