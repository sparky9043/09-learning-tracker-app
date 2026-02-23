interface OptionProps {
  value: string;
}

const Option = (props: OptionProps) => {
  return (
    <option value={props.value}>
      {props.value}
    </option>
  )
}

export default Option;