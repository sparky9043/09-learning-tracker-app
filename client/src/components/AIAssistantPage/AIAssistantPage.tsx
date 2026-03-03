import entriesService from "@/service/entriesService";
import { type SavedLearningEntry } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import EntryItem from "./EntryItem";
// import { useState } from "react";

const AIAssistantPage = () => {
  // const [selectedEntries, setSelectedEntries] = useState<AIUserEntryInput[]>([]);

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
    // const entriesToSubmit = {
    //   concepts: selectedEntries
    const data = Array.from((event.target as HTMLFormElement).entry) as HTMLInputElement[];

    const selectedList = data.filter(entry => {
      return entry.checked;
    });

    console.log(selectedList);

    // for (const input of data) {
    //   const inputEntry = input as HTMLInputElement;
    //   inputEntry.checked = false;
    // }
  };

  // const handleClick = (entryId: number) => {
  //   const entry = entryByUserQuery.data.find(entry => Number(entry.id) === Number(entryId));

  //   if (!entry || !entry.note || !entry.topic) {
  //     throw new Error('the note you selected is not found');
  //   }

  //   const isEntrySelected = selectedEntries.map(entry => entry.note).includes(entry?.note)

  //   if (entry?.note && !isEntrySelected) {
  //     setSelectedEntries(prev => [...prev, { id: entry?.id ,note: entry?.note, topic: entry?.topic }])
  //   }

  // };
  
  return (
    <div>
      AI Assistant Page
      <form onSubmit={handleSubmit}>
        {entryByUserQuery.data.map(entry => <EntryItem key={entry.id} entry={entry} />)}
        <Button>Submit</Button>
      </form>
    </div>
  )
};

export default AIAssistantPage;