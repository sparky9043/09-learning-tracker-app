import userService from "@/service/userService";
import { useState } from "react";
import { useNavigate } from "react-router";

const SignupForm = () => {
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
  );
}

export default SignupForm;