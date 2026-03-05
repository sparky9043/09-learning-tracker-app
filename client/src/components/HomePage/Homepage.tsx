// import { NavLink } from "react-router";
import HomeHeader from "./HomeHeader";
import NavBar from "./NavBar";

const Homepage = () => {

  return (
    <div className="flex flex-col h-dvh">
      <NavBar />
      <HomeHeader>
        Learning Tracker
      </HomeHeader>
      <footer className="bg-stone-900 text-stone-200 p-8 font-geist">
        by sparky9043
      </footer>
    </div>
  )
}

export default Homepage;