import type { SetStateAction } from "react";
import type React from "react";
import Option from "./Option";

interface SelectComponentProps {
  value: string;
  onChange: React.Dispatch<SetStateAction<string>>;
  options: string[];
  className?: string;
}

const SelectComponent = (props: SelectComponentProps) => {
  return (
    <select
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      className={props.className}
      data-testid="SelectComponent:selectElement"
    >
      {props.options.map(element => <Option key={element} value={element} />)}
    </select>
  )
};

export default SelectComponent;