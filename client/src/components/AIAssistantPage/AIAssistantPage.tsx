import entriesService from "@/service/entriesService";
import { type AIGeneratedQuestionObject, type AIGeneratedStudyQuestions, type SavedLearningEntry } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import EntryItem from "./EntryItem";
// import { useState } from "react";
import axios from "axios";
import { useState } from "react";
import AIQuestions from "./AIQuestions";
// import { useState } from "react";

const AIAssistantPage = () => {
  // const [selectedEntries, setSelectedEntries] = useState<AIUserEntryInput[]>([]);
  const [questions, setQuestions] = useState<AIGeneratedQuestionObject[]>([]);
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
      setQuestions([]);
      const data = Array.from((event.target as HTMLFormElement).entry) as HTMLInputElement[];
      
      const selectedInputs = data.filter(input => {
        return input.checked;
      });
      
      if (!selectedInputs.length) return;
      
      const selectedIds = selectedInputs.map(input => Number(input.id));
      
      const selectedNoteEntries = entryByUserQuery.data
      .filter(entry => selectedIds.includes(entry.id))
      .map(({ id, note, topic }) => ({ id, note, topic }));
      
      const request = {
        concepts: selectedNoteEntries,
      };
      
      const response = await axios.post('/api/assistant', request);
      
      const questions = (response.data as AIGeneratedStudyQuestions).questions;
      // console.log(response.data);
      setQuestions(questions);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  console.log(questions);
  
  return (
    <div className="grid grid-cols-2">
      <form onSubmit={handleSubmit}>
        <h2>AI Assistant Page</h2>
        {entryByUserQuery.data.map(entry =>
          <EntryItem
            key={entry.id}
            entry={entry}
            isLoading={isLoading}
          />)}
        <Button>Submit</Button>
      </form>
      {isLoading
        ? <p>Generating Questions...</p>
        : <AIQuestions questions={questions}
      />}
    </div>
  )
};

export default AIAssistantPage;