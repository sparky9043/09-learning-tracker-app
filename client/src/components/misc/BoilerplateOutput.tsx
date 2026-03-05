import { Outlet } from "react-router";

const BoilerplateOutput = () => {
  return (
    <div>
      <p>Hello</p>
      <Outlet />
    </div>
  )
};

export default BoilerplateOutput;