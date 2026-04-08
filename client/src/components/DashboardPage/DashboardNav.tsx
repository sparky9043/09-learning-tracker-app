import loginService from "@/service/loginService";
import type { User } from "@/types/types";
import { NavLink, useNavigate, type NavLinkRenderProps } from "react-router";

interface DashboardNavProps {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
}

const DashboardNav = ({ currentUser, setCurrentUser }: DashboardNavProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (currentUser) {
        localStorage.removeItem('lastSavedUser');
        setCurrentUser(null);
        await loginService.logout();
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (!currentUser || !currentUser?.username) return null;

  const inactiveStyle = "font-semibold font-headline text-lg tracking-tight flex items-center hover:animate-pulse";

  const activeStyle = `${inactiveStyle} + text-tertiary`;

  const getActiveStyle = ({ isActive }: NavLinkRenderProps): string => isActive ? activeStyle : inactiveStyle;

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0e0e0e]/80 backdrop-blur-xl shadow-[0_0_40px_rgba(163,166,255,0.08)]">
    <div className="flex justify-between items-center px-8 h-16 w-full max-w-none">
      <div className="text-xl font-extrabold tracking-tighter text-[#a3a6ff] font-headline">
        My Learning Tracker
      </div>
      <div className="hidden md:flex items-center gap-8">
        <NavLink
          to='/dashboard'
          className="text-[#a3a6ff] font-semibold font-headline text-lg tracking-tight hover:animate-pulse"
        >
          Dashboard
        </NavLink>
        <NavLink
          to='history'
          // className="font-semibold font-headline text-lg tracking-tight"
          className={getActiveStyle}
        >
          History
        </NavLink>
        <NavLink
          to='summarize'
          className={getActiveStyle}
        >
          <span className="material-symbols-outlined text-xl" data-icon="smart_toy">smart_toy</span>
        </NavLink>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="px-5 py-2 rounded-xl bg-linear-to-br from-primary to-primary-dim text-on-primary font-bold transition-transform scale-95 active:scale-90 font-label text-sm shadow-lg shadow-primary/10"
          onClick={handleLogout}
        >Logout</button>
      </div>
    </div>
  </nav>
  )
};

export default DashboardNav;