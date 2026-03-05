import { useCurrentUserContext } from "@/hooks/useCurrentUserContext";
import { NavLink } from "react-router";

const NavBar = () => {
  const { currentUser } = useCurrentUserContext();

  return (
    <nav className="bg-stone-900 text-stone-50 p-8 font-geist">
      <ul className="flex justify-between">
        <li>
          <NavLink to='/' replace={true}>
            Home
          </NavLink>
        </li>
        <li>
          {currentUser
            ? <NavLink to='dashboard' replace={true}>
              Dashboard
            </NavLink>
            : <NavLink to='/login' replace={true}>
                Login
              </NavLink>
          }
        </li>
      </ul>
    </nav>
  )
}

export default NavBar;