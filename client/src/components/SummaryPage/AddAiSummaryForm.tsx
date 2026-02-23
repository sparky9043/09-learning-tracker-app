import { useState } from "react";
// import { useCurrentUserContext } from "../../hooks/useCurrentUserContext";
import entriesService from "../../service/entriesService";
import { useNavigate } from "react-router";
import { useCurrentUserContext } from "../../hooks/useCurrentUserContext";
import useOpenaiResponseContext from "../../hooks/useOpenaiResponseContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AddAiSummaryForm = () => {
  const { currentUser } = useCurrentUserContext();
  const { openaiResponse, setOpenaiResponse } = useOpenaiResponseContext();
  const [topic, setTopic] = useState<string>('');
  const [note, setNote] = useState<string>('');
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


  const handleAddAiSummaryEntry = async (event: React.FormEvent<HTMLFormElement>) => {
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
        topic: topic,
        note: note,
        difficulty,
        minutes_spent: minutes,
      }

      learningEntriesMutation.mutate(newLearningEntryObject);
      setOpenaiResponse(null);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  }

  const handleUseAiSummary = () => {
    if (!openaiResponse) {
      return;
    }
    setTopic(openaiResponse?.topic);
    setNote(openaiResponse?.note);
  }

  return (
    <div>
      <button type="button" onClick={handleUseAiSummary}>use ai summary</button>
      <form onSubmit={handleAddAiSummaryEntry}>
        <h3>You can click the button above to use the AI summary or you can write your own</h3>
        <ul>
          <li>
            <label htmlFor="topic">topic</label>
            <input
              type="text"
              id="topic"
              name="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="note">note</label>
            <textarea
              id="note"
              name="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={5}
              cols={30}
            />
          </li>
          <li>
            <label htmlFor="difficulty">difficulty</label>
            <input
              type="number"
              id="difficulty"
              name="difficulty"
              min="1"
              max="5"
              value={difficulty}
              onChange={(e) => setDifficulty(Number(e.target.value))}
            />
          </li>
          <li>
            <label htmlFor="minutes">minutes spent</label>
            <input
              min="1"
              type="number"
              id="minutes"
              name="minutes"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
            />
          </li>
          <li>
            <button type="submit">create entry</button></li>
        </ul>
      </form>
    </div>
  )
};

export default AddAiSummaryForm;