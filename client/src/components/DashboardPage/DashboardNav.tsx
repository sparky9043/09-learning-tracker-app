import loginService from "@/service/loginService";
import type { User } from "@/types/types";
import { NavLink, useNavigate } from "react-router";

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

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0e0e0e]/80 backdrop-blur-xl shadow-[0_0_40px_rgba(163,166,255,0.08)]">
    <div className="flex justify-between items-center px-8 h-16 w-full max-w-none">
      <div className="text-xl font-extrabold tracking-tighter text-[#a3a6ff] font-headline">
        My Learning Tracker
      </div>
      <div className="hidden md:flex items-center gap-8">
        <NavLink
          to='/dashboard'
          className="text-[#a3a6ff] font-semibold font-headline text-lg tracking-tight"
        >
          Dashboard
        </NavLink>
        {/* <a className="text-on-surface-variant hover:text-[#a3a6ff] transition-colors font-headline text-lg tracking-tight"
          href="#">Courses</a>
        <a className="text-on-surface-variant hover:text-[#a3a6ff] transition-colors font-headline text-lg tracking-tight"
          href="#">Resources</a> */}
      </div>
      <div className="flex items-center gap-4">
        {/* <button
          className="px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-all duration-300 font-label text-sm">Logout</button> */}
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