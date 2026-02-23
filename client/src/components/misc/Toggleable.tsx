import { useState } from "react";
import { Button } from "../ui/button";

interface TogglelableProps {
  children: React.ReactNode;
  text?: string;
  className?: string;
}

const Togglelable = (props: TogglelableProps) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className={props.className}>
      <div style={{ display: show ? 'block' : 'none' }} className="flex flex-col justify-center items-center">
        {props.children}
        <Button onClick={() => setShow(false)}>hide</Button>
      </div>
      <div style={{ display: !show ? 'block' : 'none' }}>
        <Button onClick={() => setShow(true)}>{props.text}</Button>
      </div>
    </div>
  )
};

export default Togglelable;