import { useState } from "react";
import { Button } from "../ui/button";
import AddEntryDialog from "./AddEntryDialog";
import AddLearningEntryForm from "./AddLearningEntryForm";

const AddEntryModal = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  
  return (
    <div>
      {showModal &&
        <AddEntryDialog className="w-full top-4 bottom-0 p-4 flex flex-col items-center h-dvh sticky">
          <Button
            className="absolute right-0 rounded-lg hover:cursor-pointer hover:bg-red-200"
            variant="ghost"
            onClick={() => setShowModal(false)}
          > x </Button>
          <AddLearningEntryForm setShowModal={setShowModal} />
        </AddEntryDialog>}
      <Button onClick={() => setShowModal(true)}>add entry</Button>
    </div>
  )
}

export default AddEntryModal;