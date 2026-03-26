// import { NavLink } from "react-router";
import HomeHeader from "./HomeHeader";
import HomeMain from "./HomeMain";
import NavBar from "./NavBar";

const Homepage = () => {

  return (
    <div className="bg-background text-on-background selection:bg-primary/30 selection:text-primary">
      <NavBar />
      <HomeMain>
        <HomeHeader>
          Learning Tracker
        </HomeHeader>
      </HomeMain>
      <footer className="bg-stone-900 text-stone-200 p-8 font-geist">
        by sparky9043
      </footer>
    </div>
  )
}

export default Homepage;