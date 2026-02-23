// import { useCurrentUserStore } from "@/stores/currentUserStore";
import useCheckAuth from "../../hooks/useCheckAuth";
import { useCurrentUserContext } from "../../hooks/useCurrentUserContext";
import LoginForm from "./LoginForm";

const Login = () => {
  const { currentUser } = useCurrentUserContext();
  void useCheckAuth(currentUser);

  return (
    <div className="flex flex-col justify-center items-center h-dvh text-shadow-sm text-shadow-stone-200">
      <div className="border-2 border-stone-200 w-90 p-8 rounded-2xl">
        <LoginForm />
      </div>
    </div>
  )
}

export default Login;