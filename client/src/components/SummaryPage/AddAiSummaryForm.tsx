import { useState } from "react";
import entriesService from "../../service/entriesService";
import { useNavigate } from "react-router";
import { useCurrentUserContext } from "../../hooks/useCurrentUserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { OpenaiResponse } from "@/types/types";
import Stars from "../misc/Stars";

interface AddAiSummaryFormProps {
  openaiResponse: OpenaiResponse | null;
}


const AddAiSummaryForm = ({ openaiResponse }: AddAiSummaryFormProps) => {

  const { currentUser } = useCurrentUserContext();
  const [difficulty, setDifficulty] = useState<number>(1);
  const [minutes, setMinutes] = useState<number>(1);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const learningEntriesMutation = useMutation({
    mutationKey: ['entriesByUser'],
    mutationFn: entriesService.createEntryByUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entriesByUser'] });
    },
    onError: (error) => {
      throw new Error('an unexpected error occurred: ' + error.message);
    },
  });

  const updateDifficulty = (rating: number) => {
    setDifficulty(rating);
  }

  const handleAddAiSummaryEntry = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { note, topic } = openaiResponse!;

    try {
      if (!topic || !note) {
        throw new Error('please fill out the topic and note!');
      }

      if (difficulty < 1 || difficulty > 5) {
        throw new Error('please ensure that the difficulty is between 1 to 5');
      }

      if (minutes < 1) {
        throw new Error('time spent must be greater than 0 minutes');
      }

      const newLearningEntryObject = {
        user_id: currentUser!.id,
        topic: topic,
        note: note,
        difficulty,
        minutes_spent: minutes,
      }

      learningEntriesMutation.mutate(newLearningEntryObject);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section>
      <div className="mb-4">
        <h2 className="font-headline font-bold text-zinc-500 uppercase tracking-widest text-xs ml-2 mb-2">use ai
          summary</h2>
        <form className="bg-[#050505] border border-white/5 rounded-xl p-8 
        shadow-2xl"
          onSubmit={handleAddAiSummaryEntry}
        >
          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-6"
          >
            <div className="flex flex-col">
              <label
                className="font-label text-xs text-zinc-500 uppercase tracking-wider mb-2"
              >topic</label>
              <div className="text-on-surface font-body text-sm leading-relaxed">
                {openaiResponse?.topic}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="font-label text-xs text-zinc-500 uppercase tracking-wider mb-2">note</label>
              <div className="text-on-surface-variant font-body text-sm leading-relaxed line-clamp-3">
                {openaiResponse?.note}
              </div>
            </div>
            <div className="flex flex-col">
              <label
                className="font-label text-xs text-zinc-500 uppercase tracking-wider mb-2">difficulty</label>
              <Stars difficulty={difficulty} onChange={updateDifficulty} />
            </div>
            <div className="flex flex-col">
              <label className="font-label text-xs text-zinc-500 uppercase tracking-wider mb-2">minutes
                spent</label>
              <input
                className="bg-transparent border-b border-white/10 focus:border-primary transition-colors text-sm py-1 outline-none text-on-surface font-body w-full"
                min="1"
                type="number"
                id="minutes"
                name="minutes"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
              />
            </div>
          </div>
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 mt-6 border-t border-white/5">
            <p className="text-zinc-500 font-label text-xs flex items-center space-x-2 italic">
              <span className="material-symbols-outlined text-sm" data-icon="info">info</span>
              <span>This will be added to your 'Insights' timeline.</span>
            </p>
            <button
              className="w-full sm:w-auto px-10 py-3.5 bg-surface-container-highest hover:bg-zinc-800 text-primary font-headline font-bold rounded-xl transition-all active:scale-95 border border-white/5"
              type="submit"
            >
              Save to History
            </button>
          </div>
        </form>
      </div>
    </section >
  )
};

export default AddAiSummaryForm;