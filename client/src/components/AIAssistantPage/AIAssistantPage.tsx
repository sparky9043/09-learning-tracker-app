import entriesService from "@/service/entriesService";
import { type AIUserEntryInput, type SavedLearningEntry } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import EntryItem from "./EntryItem";
import { useState } from "react";

const AIAssistantPage = () => {
  const [selectedEntries, setSelectedEntries] = useState<AIUserEntryInput[]>([]);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const entriesToSubmit = {
      concepts: selectedEntries
    }

    console.log(entriesToSubmit);

  };

  const handleClick = (entryId: number) => {
    const entry = entryByUserQuery.data.find(entry => Number(entry.id) === Number(entryId));

    if (!entry || !entry.note || !entry.topic) {
      throw new Error('the note you selected is not found');
    }

    const isEntrySelected = selectedEntries.map(entry => entry.note).includes(entry?.note)

    if (entry?.note && !isEntrySelected) {
      setSelectedEntries(prev => [...prev, { note: entry?.note, topic: entry?.topic }])
    }

  };
  
  return (
    <div>
      AI Assistant Page
      {entryByUserQuery.data.map(entry => <EntryItem key={entry.id} entry={entry} onClick={handleClick} />)}
      <form onSubmit={handleSubmit}>
        <Button>Submit</Button>
      </form>
    </div>
  )
};

export default AIAssistantPage;