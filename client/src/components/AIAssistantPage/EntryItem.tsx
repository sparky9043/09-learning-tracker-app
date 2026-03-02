import type { SavedLearningEntry } from "@/types/types";

interface EntryItemProps {
  entry: SavedLearningEntry;
}

const EntryItem = (props: EntryItemProps) => {
  console.log(props);
  return (
    <div>
      entry item
    </div>
  )
};

export default EntryItem;