import type { SavedLearningEntry } from "@/types/types";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { format } from 'date-fns';
import Togglelable from "../misc/Toggleable";

interface LearningEntriesProps {
  data: SavedLearningEntry[]
}

const LearningEntries = ({ data }: LearningEntriesProps) => {

  return (
    <ul className="flex flex-wrap justify-center">
      {data.map(entry => <li key={entry.id} className="w-100 h-100 p-2">
        <Card className="h-full flex flex-col item-center justify-center text-center text-2xl shadow-lg">
          <CardHeader>
            <CardHeader className="margin-0 padding-0 text-shadow-md text-shadow-stone-300">{entry.topic}</CardHeader>
            <CardDescription>
              <p>
                time spent: {entry.minutes_spent} minutes
              </p>
              <p>
                date: { format(entry.created_at, 'MMMM dd, yyyy')}
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
              <Togglelable text="see details">
                <CardDescription>
                  <div>
                    {entry.note}
                  </div>
                </CardDescription>
              </Togglelable>
          </CardContent>
        </Card>
        </li>)}
    </ul>
  )
};

export default LearningEntries;