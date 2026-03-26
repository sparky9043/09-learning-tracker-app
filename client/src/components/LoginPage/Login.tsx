// import { useCurrentUserStore } from "@/stores/currentUserStore";
import useCheckAuth from "../../hooks/useCheckAuth";
import { useCurrentUserContext } from "../../hooks/useCurrentUserContext";
import LoginForm from "./LoginForm";

const Login = () => {
  const { currentUser } = useCurrentUserContext();
  void useCheckAuth(currentUser);

  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary/30">
      <LoginForm />
    </div>
  )
}

export default Login;