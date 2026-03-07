import type { SavedLearningEntry } from "@/types/types";
import { useState } from "react";
import { Card } from "../ui/card";
// import { Checkbox } from "../ui/checkbox";

interface EntryItemProps {
  entry: SavedLearningEntry;
  isLoading: boolean;
}

const EntryItem = (props: EntryItemProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  return (
    <Card>
      <input
        id={String(props.entry.id)}
        type="checkbox"
        checked={isSelected}
        name="entry"
        onChange={(e) => setIsSelected((e.target.checked))}
        disabled={props.isLoading}
      />
      <ul>
        <li>{props.entry.topic}</li>
        <li>{props.entry.note}</li>
        {/* <li>
          <Button onClick={() => props.onClick(props.entry.id)}>Add </Button>
        </li> */}
      </ul>
    </Card>
  )
};

export default EntryItem;