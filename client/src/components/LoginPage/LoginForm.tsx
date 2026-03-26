import { useEffect, useState } from "react";
import loginService from "../../service/loginService";
// import { useCurrentUserContext } from "../../hooks/useCurrentUserContext";
import { useNavigate } from "react-router";
// import { useCurrentUserContext } from "../../hooks/useCurrentUserContext";
// import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
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
    <main className="min-h-screen flex items-center justify-center pt-16 pb-12 px-6 relative overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none">
      </div>
      <div
        className="absolute bottom-1/4 -right-20 w-80 h-80 bg-tertiary/5 rounded-full blur-[100px] pointer-events-none">
      </div>
      <section className="w-full max-w-md z-10">
        <div className="mb-10 text-left">
          <h1 className="font-headline text-5xl font-extrabold tracking-tighter mb-3 leading-none">
            Welcome <span className="text-primary">Back.</span>
          </h1>
          <p className="text-on-surface-variant text-lg">Continue your personal learning journey.</p>
        </div>
        <div className="bg-surface-container-low rounded-xl p-8 shadow-[0_0_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-tertiary"></div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="font-label text-xs uppercase tracking-widest text-on-surface-variant ml-1">Username</label>
              <div className="relative group">
                <input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.currentTarget.value)}
                  type="text"
                  className="w-full bg-surface-container-lowest border-none focus:ring-2 focus:ring-primary rounded-lg py-4 px-5 text-on-surface placeholder:text-outline/50 transition-all"
                  placeholder="Enter your username"
                />
              </div>
              <p className="font-label text-xs tracking-widest text-inverse-surface ml-1">Must be at least 3 characters</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label
                    className="font-label text-xs uppercase tracking-widest text-on-surface-variant"
                    htmlFor="password"
                  >Password</label>
                </div>
                <div className="relative group">
                  <input
                    id="password"
                    className="w-full bg-surface-container-lowest border-none focus:ring-2 focus:ring-primary rounded-lg py-4 px-5 text-on-surface placeholder:text-outline/50 transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    type="password"
                    placeholder="********"
                  />
                </div>
              </div>
              <div className="font-label text-xs tracking-widest text-inverse-surface ml-1">Must be at least 6 characters</div>
              <div>
                <div className="pt-2">
                  <button
                    className="w-full bg-linear-to-br from-primary to-primary-dim text-on-primary font-headline font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all duration-300 active:scale-[0.98]"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    className="w-full bg-linear-to-br from-primary to-primary-dim text-on-primary font-headline font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all duration-300 active:scale-[0.98]"
                    onClick={() => navigate('/')}
                  >
                    Back
                  </button>
                </div>
              </div>
              <div className="absolute text-red-500">{errorMessage}</div>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
};

export default LoginForm;