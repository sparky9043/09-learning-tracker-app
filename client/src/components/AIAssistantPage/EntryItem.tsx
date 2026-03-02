import type { SavedLearningEntry } from "@/types/types";
import { Button } from "../ui/button";

interface EntryItemProps {
  entry: SavedLearningEntry;
  onClick: (entryId: number) => void;
}

const EntryItem = (props: EntryItemProps) => {
  return (
    <div>
      <ul>
        <li>{props.entry.topic}</li>
        <li>{props.entry.note}</li>
        <li>
          <Button onClick={() => props.onClick(props.entry.id)}>Add </Button>
        </li>
      </ul>
    </div>
  )
};

export default EntryItem;