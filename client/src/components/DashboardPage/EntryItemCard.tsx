import type { SavedLearningEntry } from "@/types/types";
import { format } from "date-fns";
import Stars from "../misc/Stars";

interface EntryItemCardItemProps {
  entry: SavedLearningEntry;
}

const EntryItemCardItem = ({ entry }: EntryItemCardItemProps) => {

  return (
    <div
      className="bg-surface-container p-6 rounded-xl hover:bg-surface-container-high transition-colors group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div
            className="w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>check</span>
          </div>
          <div>
            <h3 className="font-headline font-bold text-xl text-on-surface">{entry.topic}</h3>
            <p className="text-sm text-on-surface-variant font-body">{entry.note}</p>
          </div>
        </div>
        {/* <span
          className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">more_vert</span> */}
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-label text-on-surface-variant">
          <span>Date: {format(entry.created_at, 'MMM do yyyy')}</span>
          <span className="uppercase">Difficulty</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-label text-on-surface-variant">
            <span>Time Spent: {entry.minutes_spent} min</span>
            <Stars difficulty={entry.difficulty} />
          </div>
        </div>
        {/* <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
          <div className="h-full bg-tertiary" style={{ width: `${(entry.difficulty / 5) * 100}%` }}></div>
        </div> */}
      </div>
    </div>
  )
};

export default EntryItemCardItem;