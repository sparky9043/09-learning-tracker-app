import entriesService from "@/service/entriesService";
import { type AIGeneratedQuestionObject, type AIGeneratedStudyQuestions, type SavedLearningEntry } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import EntryItem from "./EntryItem";
// import { useState } from "react";
import axios from "axios";
import { useState } from "react";
import AIQuestions from "./AIQuestions";
import LoadingWheel from "../misc/LoadingWheel";
import AIAssistantInstructions from "./AIAssistantInstructions";
// import { useState } from "react";

const AIAssistantPage = () => {
  // const [selectedEntries, setSelectedEntries] = useState<AIUserEntryInput[]>([]);
  const [questions, setQuestions] = useState<AIGeneratedQuestionObject[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const entryByUserQuery = useQuery<SavedLearningEntry[]>({
    queryKey: ['entriesByUser'],
    queryFn: entriesService.getAllEntriesByUser,
  });

  if (entryByUserQuery?.isLoading) {
    return <div>
      Loading Entries By User...
    </div>
  }

  if (!entryByUserQuery.data) {
    return <div>
      an unexpected error occurred...
    </div>
  }

  if (entryByUserQuery.isError) {
    return <div>
      hello
    </div>
  }

  if (!entryByUserQuery.data) {
    return (
      <div>
        Data not loaded
      </div>
    )
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      setQuestions(null);
      const data = Array.from((event.target as HTMLFormElement).entry) as HTMLInputElement[];
      
      const selectedInputs = data.filter(input => {
        return input.checked;
      });
      
      if (!selectedInputs.length) {
        const errorMessage = "please select at least one question!";
        alert(errorMessage)
        throw new Error(errorMessage);
      }
      
      const selectedIds = selectedInputs.map(input => Number(input.id));
      
      const selectedNoteEntries = entryByUserQuery.data
      .filter(entry => selectedIds.includes(entry.id))
      .map(({ id, note, topic }) => ({ id, note, topic }));
      
      const request = {
        concepts: selectedNoteEntries,
      };
      
      const response = await axios.post('/api/assistant', request);
      
      const questions = (response.data as AIGeneratedStudyQuestions).questions;
      setQuestions(questions);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="grid grid-cols-2 p-4">
      <form onSubmit={handleSubmit}>
        <AIAssistantInstructions />
        <div className="flex flex-col items-center mt-4 mb-4 flex-wrap gap-4">
          {Array.isArray(entryByUserQuery.data)
            &&
            entryByUserQuery.data.map(entry =>
              <EntryItem
                key={entry.id}
                entry={entry}
                isLoading={isLoading}
          />)}
        </div>
        <Button type="submit">Submit</Button>
      </form>
      {isLoading
        ? <LoadingWheel loadingText="please wait while we generate questions" />
        : <AIQuestions questions={questions}
      />}
    </div>
  )
};

export default AIAssistantPage;