import { useState } from "react";
// import { useCurrentUserContext } from "../../hooks/useCurrentUserContext";
import entriesService from "../../service/entriesService";
import { useNavigate } from "react-router";
import { useCurrentUserContext } from "../../hooks/useCurrentUserContext";
import useOpenaiResponseContext from "../../hooks/useOpenaiResponseContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

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
      <form
        className="rounded-md p-4 shadow-lg shadow-stone-300"
        onSubmit={handleAddAiSummaryEntry}
      >
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="topic">topic</FieldLabel>
              <Input
                type="text"
                id="topic"
                name="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
              <FieldDescription className="text-xs">Enter the name of the topic</FieldDescription>
              <FieldLabel htmlFor="note">note</FieldLabel>
              <Textarea
                className="resize-none"
                id="note"
                name="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={5}
                cols={30}
              />
              <FieldDescription className="text-xs">Write a brief summary of what you learned</FieldDescription>
              <FieldLabel htmlFor="difficulty">difficulty</FieldLabel>
              <Input
                type="number"
                id="difficulty"
                name="difficulty"
                min="1"
                max="5"
                value={difficulty}
                onChange={(e) => setDifficulty(Number(e.target.value))}
              />
              <FieldDescription className="text-xs">Only numbers between 1 to 5</FieldDescription>
              <FieldLabel htmlFor="minutes">minutes spent</FieldLabel>
              <Input
                min="1"
                type="number"
                id="minutes"
                name="minutes"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
              />
              <FieldDescription className="text-xs">At least 1 minute</FieldDescription>
              <Button type="submit">create entry</Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  )
};

export default AddAiSummaryForm;