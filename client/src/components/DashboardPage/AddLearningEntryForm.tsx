import { useState, type SetStateAction } from "react";
// import { useCurrentUserContext } from "../../hooks/useCurrentUserContext";
import entriesService from "../../service/entriesService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentUserContext } from "../../hooks/useCurrentUserContext";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
// import { FieldLabel } from "../ui/FieldLabel";
import { Button } from "../ui/button";
import { FieldLabel } from "../ui/field";
// import { FieldFieldLabel } from "../ui/field";

interface AddLearningEntryFormProps {
  setShowModal: React.Dispatch<SetStateAction<boolean>>
}

const AddLearningEntryForm = ({ setShowModal }: AddLearningEntryFormProps) => {
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
      setShowModal(false);
    
    } catch (error) {
      console.error(error);
    }
  }

  return (
      <Card className="p-4 text-left border-none">
        <CardHeader>
          <CardTitle>Enter today's learning below</CardTitle>
          <CardDescription>Write the topic and make note of what you learned today</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex justify-center p-4">
            <div>
              <div>
                <FieldLabel htmlFor="topic">topic</FieldLabel>
                <Input
                  type="text"
                  id="topic"
                  name="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              <div>
                <FieldLabel htmlFor="note">note</FieldLabel>
                <Textarea
                  id="note"
                  name="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={5}
                  cols={30}
                />
              </div>
              <div>
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
              </div>
              <div>
                <FieldLabel htmlFor="minutes">minutes spent</FieldLabel>
                <Input
                  min="1"
                  type="number"
                  id="minutes"
                  name="minutes"
                  value={minutes}
                  onChange={(e) => setMinutes(Number(e.target.value))}
                  />
              </div>
              <div>
                <Button type="submit">create entry</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
  )
}

export default AddLearningEntryForm;