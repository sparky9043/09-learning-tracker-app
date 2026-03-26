import { useNavigate } from "react-router";
import { Button } from "../ui/button";

interface HomeHeroProps {
  children: string;
}

const HomeHero = (props: HomeHeroProps) => {
  const navigate = useNavigate();

  return (
    <div className="font-geist text-center flex flex-col justify-center items-center gap-4 text-shadow-md mb-auto h-full">
      <h1 className="font-bold tracking-wide uppercase text-5xl">{props.children}</h1>
      <p className="text-stone-500">keep track of your learning progress</p>
      <Button onClick={() => navigate('/login')}>
        Start Tracking
      </Button>
    </div>
  )
}

export default HomeHero;