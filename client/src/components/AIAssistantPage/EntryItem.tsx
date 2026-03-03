import type { SavedLearningEntry } from "@/types/types";
import { useState } from "react";

interface EntryItemProps {
  entry: SavedLearningEntry;
  // onClick: (entryId: number) => void;
}

const EntryItem = (props: EntryItemProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  return (
    <div className="border-2 p-4 m-4">
      <input
        id={String(props.entry.id)}
        type="checkbox"
        checked={isSelected}
        name="entry"
        onChange={(e) => setIsSelected(e.target.checked)}
      />
      <ul>
        <li>{props.entry.topic}</li>
        <li>{props.entry.note}</li>
        {/* <li>
          <Button onClick={() => props.onClick(props.entry.id)}>Add </Button>
        </li> */}
      </ul>
    </div>
  )
};

export default EntryItem;