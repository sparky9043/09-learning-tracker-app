import type { SavedLearningEntry } from "@/types/types";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { format } from 'date-fns';
import Togglelable from "../misc/Toggleable";
import { Button } from "../ui/button";
import entriesService from "@/service/entriesService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface LearningEntryItemProps {
  entry: SavedLearningEntry;
}

const LearningEntryItem = ({ entry }: LearningEntryItemProps) => {

  const client = useQueryClient();

  const deleteEntryMutation = useMutation({
    mutationKey: ['entriesByUser'],
    mutationFn: entriesService.deleteEntryByUser,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['entriesByUser'],
      })
    }
  });

  const handleDelete = (entryId: number) => {
    console.log(entryId);
    deleteEntryMutation.mutate(entryId);
  }

  return (
    <li key={entry.id} className="w-80 h-80 p-2">
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
          <Button
            className="cursor-pointer hover:bg-red-200"
            variant="ghost"
            onClick={() => handleDelete(entry.id)}
          >
            delete entry
          </Button>
        </CardContent>
      </Card>
    </li>
  )
};

export default LearningEntryItem;