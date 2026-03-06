import { useEffect, useState } from "react";
import loginService from "../../service/loginService";
// import { useCurrentUserContext } from "../../hooks/useCurrentUserContext";
import { useNavigate } from "react-router";
// import { useCurrentUserContext } from "../../hooks/useCurrentUserContext";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
// import { useCurrentUserStore } from "@/stores/currentUserStore";
import { useCurrentUserContext } from "@/hooks/useCurrentUserContext";

const LoginForm = () => {
  const { currentUser, setCurrentUser } = useCurrentUserContext();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (currentUser) {
        localStorage.removeItem('lastSavedUser');
        setCurrentUser(null);
      }
      const savedUserObject = await loginService.login({ username, password });
      setCurrentUser(savedUserObject.user);
      localStorage.setItem('lastSavedUser', JSON.stringify(savedUserObject.user));
      navigate('/dashboard', { replace: true });

    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    }
  }

  return (
    <form
      onSubmit={handleLogin}
    >
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="username" className="font-medium text-lg tracking-wider">Username</FieldLabel>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
              type="text"
              className="hover:cursor-pointer"
              placeholder="Enter your username"
            />
            <FieldDescription className="text-sm">Must be at least 3 characters</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="password" className="font-medium text-lg tracking-wider">Password</FieldLabel>
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              type="password"
              className="hover:cursor-pointer"
              placeholder="********"
            />
            <FieldDescription className="text-sm">Must be at least 6 characters</FieldDescription>
          </Field>
          <div className="flex gap-2">
            <Button type="submit" variant="default" className="hover:bg-stone-600 hover:cursor-pointer">Login</Button>
            <Button type="button" variant="outline" className="hover:cursor-pointer" onClick={() => navigate('/')}>Back</Button>
          </div>
        </FieldGroup>
      </FieldSet>
      <div className="absolute text-red-500">{errorMessage}</div>
    </form>
  )
};

export default LoginForm;