import { useNavigate } from "react-router";
import { Button } from "../ui/button";

interface HomeHeaderProps {
  children: string;
  className?: string;
}

const HomeHeader = (props: HomeHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className={props.className}>
      <h1 className="font-bold tracking-wide uppercase text-5xl">{props.children}</h1>
      <p className="text-stone-500">keep track of your learning progress</p>
      <Button onClick={() => navigate('/login')}>
        Start Tracking
      </Button>
    </div>
  )
}

export default HomeHeader;