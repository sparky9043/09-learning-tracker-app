import userService from "@/service/userService";
import { useState } from "react";
import { Link, useNavigate } from "react-router"

const Signup = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleCreateUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!username || !password) {
        throw new Error('Please fill out both username and password');
      }

      const newUser = {
        username, password
      };

      userService.createUser(newUser);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface selection:bg-primary/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-tertiary/5 blur-[120px] rounded-full"></div>
      </div>
      <main className="relative z-10 w-full max-w-105">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl font-extrabold tracking-tighter text-on-background mb-3">
            Welcome
          </h1>
          <p className="text-on-surface-variant font-body text-sm tracking-wide">
            Start your journey into the focused deep work.
          </p>
        </div>
        <div className="glass-card p-8 rounded-xl border-outline-variant/10 shadow-2xl">
          <form
            className="space-y-6"
            onSubmit={handleCreateUser}
          >
            <div className="space-y-2">
              <label className="block font-label text-xs font-semibold text-on-surface-variant tracking-widest uppercase"
                htmlFor="username">
                Username
              </label>
              <div className="relative">
                <span
                  className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                  person
                </span>
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="w-full bg-surface-container-lowest border-none rounded-lg py-4 pl-12 pr-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary transition-all duration-300 font-body text-sm"
                  id="username"
                  name="username"
                  placeholder="Create your unique handle"
                  required={true}
                  type="text"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block font-label text-xs font-semibold text-on-surface-variant tracking-widest uppercase"
                htmlFor="password">
                Password
              </label>
              <div className="relative">
                <span
                  className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                  lock
                </span>
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full bg-surface-container-lowest border-none rounded-lg py-4 pl-12 pr-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary transition-all duration-300 font-body text-sm"
                  id="password"
                  name="password"
                  placeholder="********"
                  required={true}
                  type="password"
                />
              </div>
            </div>
            {/* <p className="text-[11px] text-outline text-center leading-relaxed px-4">
              By joining, you agree to our <a className="text-primary hover:underline transition-all" href="#">Terms of
                Service</a> and <a className="text-primary hover:underline transition-all" href="#">Privacy Policy</a>.
            </p> */}
            <button
              className="w-full group relative overflow-hidden bg-linear-to-br from-primary to-primary-dim text-on-primary font-headline font-bold py-4 rounded-lg shadow-lg shadow-primary/20 active:scale-[0.98] transition-all duration-200"
              type="submit">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Sign Up
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </span>
            </button>
          </form>
          <div className="mt-8 pt-6 border-t border-outline-variant/10 text-center">
            <Link className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors duration-200"
              to="/login"
            >
              Already have an account? <span className="font-semibold text-primary">Log in</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Signup