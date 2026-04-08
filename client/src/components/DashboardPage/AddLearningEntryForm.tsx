import { useState } from "react";
import entriesService from "../../service/entriesService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentUserContext } from "../../hooks/useCurrentUserContext";
import Stars from "../misc/Stars";

const AddLearningEntryForm = () => {
  const { currentUser } = useCurrentUserContext();
  const [topic, setTopic] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [difficulty, setDifficulty] = useState<number>(1);
  const [minutes, setMinutes] = useState<number>(1);
  const entryQueryClient = useQueryClient();
  const learningEntriesMutation = useMutation({
    mutationFn: entriesService.createEntryByUser,
    mutationKey: ['entriesByUser'],
    onSuccess: () => {
      entryQueryClient.invalidateQueries({ queryKey: ['entriesByUser'] });
    }
  });

  const updateDifficulty = (rating: number) => {
    setDifficulty(rating);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        topic,
        note,
        difficulty,
        minutes_spent: minutes,
      }

      learningEntriesMutation.mutate(newLearningEntryObject);

      setTopic('');
      setNote('');
      setDifficulty(1);
      setMinutes(1);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-surface-container p-8 rounded-xl shadow-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <span className="material-symbols-outlined text-9xl" style={{ fontVariationSettings: 'FILL 1' }}>add_circle</span>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <h2 className="font-headline font-bold text-2xl mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">edit_note</span>
          New Learning Entry
        </h2>
        <div>
          <label
            htmlFor="topic"
            className="block text-xs font-label text-on-surface-variant uppercase tracking-widest mb-2"
          >
            Topic
          </label>
          <input
            className="w-full bg-surface-container-lowest border-none ring-2 ring-transparent focus:ring-primary rounded-lg p-4 text-on-surface placeholder:text-outline transition-all"
            type="text"
            placeholder="e.g., Master Tailwind Gradients"
            id="topic"
            name="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="note"
            className="block text-xs font-label text-on-surface-variant uppercase tracking-widest mb-2"
          >
            note
          </label>
          <textarea
            className="w-full bg-surface-container-lowest border-none ring-2 ring-transparent focus:ring-primary rounded-lg p-4 text-on-surface placeholder:text-outline transition-all resize-none"
            id="note"
            name="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            cols={20}
            placeholder="Write what you learned here"
          />
        </div>
        <div>
          <label
            htmlFor="difficulty"
            className="block text-xs font-label text-on-surface-variant uppercase tracking-wide mb-2"
          >difficulty (maximum 5 stars)</label>
          <Stars difficulty={difficulty} onChange={updateDifficulty} />
        </div>
        <div>
          <label
            htmlFor="minutes"
            className="block text-xs font-label text-on-surface-variant uppercase tracking-widest mb-2"
          >Time Spent (minutes)</label>
          <input
            className="w-full bg-surface-container-lowest border-none ring-2 ring-transparent focus:ring-primary rounded-lg p-4 text-on-surface placeholder:text-outline transition-all"
            min="1"
            type="number"
            id="minutes"
            name="minutes"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
          />
        </div>
        <div>
          <button
            className="w-full bg-linear-to-br from-primary to-primary-dim text-on-primary font-extrabold py-4 rounded-xl transition-all hover:shadow-[0_0_30px_rgba(163,166,255,0.3)] active:scale-[0.98] hover:cursor-pointer"
            type="submit"
          >Create Entry</button>
        </div>
      </form>
    </div>
  )
}

export default AddLearningEntryForm;