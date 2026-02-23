// import type { SetStateAction } from "react"

interface AddEntryDialogProps {
  // setShowModal: React.Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  className?: string;
}

const AddEntryDialog = (props: AddEntryDialogProps) => {
  return (
    <dialog className={props.className}>
      {props.children}
    </dialog>
  )
}

export default AddEntryDialog;