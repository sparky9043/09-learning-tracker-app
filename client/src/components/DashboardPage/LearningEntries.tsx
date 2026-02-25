import type { SavedLearningEntry } from "@/types/types";
import LearningEntryItem from "./LearningEntryItem";

interface LearningEntriesProps {
  data: SavedLearningEntry[]
}

const LearningEntries = ({ data }: LearningEntriesProps) => {

  return (
    <ul className="flex">
      {data.map(entry =>
        <LearningEntryItem key={entry.id} entry={entry} />
      )}
    </ul>
  )
};

export default LearningEntries;