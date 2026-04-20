import { useCurrentUserContext } from "@/hooks/useCurrentUserContext";
import { NavLink } from "react-router";

const NavBar = () => {
  const { currentUser } = useCurrentUserContext();

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0e0e0e]/80 backdrop-blur-xl shadow-[0_0_40px_rgba(163,166,255,0.08)] flex justify-between items-center px-8 h-16 max-w-none">
      <div className="text-xl font-extrabold tracking-tighter text-[#a3a6ff] font-headline">
        My Learning Tracker
      </div>
      <div>
        <NavLink
          to='/'
          replace={true}
          className="text-on-surface-variant hover:text-[#a3a6ff] text-sm font-label font-medium opacity-80 hover:opacity-100 transition-opacity"
        >
          <span className="material-symbols-outlined text-xl" data-icon="home">home</span>
        </NavLink>
      </div>
      <div className="flex items-center gap-6">
        {
          !currentUser ?
            <>
              <NavLink
                to='/login'
                replace={true}
                className="text-on-surface-variant hover:text-[#a3a6ff] text-sm font-label font-medium opacity-80 hover:opacity-100 transition-opacity"
              >
                Login
              </NavLink>
              <NavLink
                to='/signup'
                replace={true}
                className="bg-linear-to-br from-primary to-primary-dim text-on-primary px-5 py-2 rounded-lg font-bold text-sm tracking-tight scale-95 active:scale-90 transition-transform"
              >
                Sign Up
              </NavLink>
            </>
            :
            <NavLink
              to='dashboard' replace={true}
              className="bg-linear-to-br from-primary to-primary-dim text-on-primary px-5 py-2 rounded-lg font-bold text-sm tracking-tight scale-95 active:scale-90 transition-transform"
            >
              Dashboard
            </NavLink>
        }
      </div>
    </nav>
  )
}

export default NavBar;