import type { SavedLearningEntry } from "@/types/types";
import { format } from "date-fns";
import Stars from "../misc/Stars";

interface EntryItemCardItemProps {
  entry: SavedLearningEntry;
}

const EntryItemCard = ({ entry }: EntryItemCardItemProps) => {

  // return (
  //   <div
  //     className="group bg-surface-container-low p-6 rounded-xl hover:bg-surface-container transition-all duration-300 refined-border">
  //     <div className="flex justify-between items-start mb-4">
  //       <div className="flex justify-between items-start mb-6">
  //         <div
  //           className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
  //           <span className="material-symbols-outlined text-xl" data-icon="code">code</span>
  //         </div>
  //       </div>
  //       <div className="flex gap-4">
  //         <div>
  //           <h3 className="font-headline font-bold text-xl text-on-surface">{entry.topic}</h3>
  //           <p className="text-sm text-on-surface-variant font-body">{entry.note}</p>
  //         </div>
  //       </div>
  //       {/* <span
  //         className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">more_vert</span> */}
  //     </div>
  //     <div className="space-y-2">
  //       <div className="flex justify-between text-xs font-label text-on-surface-variant">
  //         <span>Date: {format(entry.created_at, 'MMM do yyyy')}</span>
  //         <span className="uppercase">Difficulty</span>
  //       </div>
  //       <div className="space-y-2">
  //         <div className="flex justify-between items-center text-xs font-label text-on-surface-variant">
  //           <span>Time Spent: {entry.minutes_spent} min</span>
  //           <Stars difficulty={entry.difficulty} />
  //         </div>
  //       </div>
  //       {/* <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
  //         <div className="h-full bg-tertiary" style={{ width: `${(entry.difficulty / 5) * 100}%` }}></div>
  //       </div> */}
  //     </div>
  //   </div>
  // )
  return (
    <div
      className="group bg-surface-container-low p-6 rounded-xl hover:bg-surface-container transition-all duration-300 refined-border">
      <div className="flex justify-between items-start mb-6">
        <div
          className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
          <span className="material-symbols-outlined text-xl" data-icon="code">code</span>
        </div>
        <Stars difficulty={entry.difficulty} />
      </div>
      <h3 className="text-xl font-headline font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
        {entry.note}</h3>
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