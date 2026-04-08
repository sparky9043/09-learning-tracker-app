import type { SavedLearningEntry } from "@/types/types";
import { format } from "date-fns";
import Stars from "../misc/Stars";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import entriesService from "@/service/entriesService";

interface EntryItemCardItemProps {
  entry: SavedLearningEntry;
}

const EntryItemCard = ({ entry }: EntryItemCardItemProps) => {
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
    <div
      className="group bg-surface-container-low p-6 rounded-xl hover:bg-surface-container transition-all duration-300 refined-border">
      <div className="flex justify-between items-start mb-6 relative">
        <div
          className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
          <span className="material-symbols-outlined text-xl" data-icon="code">code</span>
        </div>
        <div className="mb-6 mt-6 absolute right-0 hidden group-hover:block">
          <button
            className="w-10 h-10 rounded-lg flex items-center justify-center text-primary group-hover:text-error-container transition-colors hover:cursor-pointer"
            onClick={() => handleDelete(entry.id)}  
          >
            <span className="material-symbols-outlined text-xl" data-icon="delete">delete</span>
          </button>
        </div>
        <Stars difficulty={entry.difficulty} />
      </div>
      <h3 className="text-xl font-headline font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
        {entry.topic}</h3>
      <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">{entry.note}</p>
      <div className="flex items-center justify-between pt-5 border-t border-white/5">
        <div className="flex items-center gap-2 text-on-surface-variant text-xs font-medium">
          <span className="material-symbols-outlined text-sm" data-icon="calendar_today">calendar_today</span>
          {format(entry.created_at, 'MMM dd, yyyy')}
        </div>
        <div className="flex items-center gap-2 text-primary font-semibold text-xs">
          <span className="material-symbols-outlined text-sm" data-icon="schedule">schedule</span>
          {entry.minutes_spent}m
        </div>
      </div>
    </div>
  )
};

export default EntryItemCard;