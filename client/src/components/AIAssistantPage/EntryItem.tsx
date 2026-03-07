import type { SavedLearningEntry } from "@/types/types";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
// import { Checkbox } from "../ui/checkbox";

interface EntryItemProps {
  entry: SavedLearningEntry;
  isLoading: boolean;
}

const EntryItem = (props: EntryItemProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  return (
    <Card className="max-w-3/4 flex">
      <CardHeader>
        <label className="flex gap-4 hover:font-medium hover:cursor-pointer items-center">
          <input
            id={String(props.entry.id)}
            type="checkbox"
            checked={isSelected}
            name="entry"
            onChange={(e) => setIsSelected((e.target.checked))}
            disabled={props.isLoading}
          />
          {props.entry.topic}
        </label>
      </CardHeader>
      <CardContent>
        <p>{props.entry.note}</p>
      </CardContent>
    </Card>
  )
};

export default EntryItem;