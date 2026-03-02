import entriesService from "@/service/entriesService";
import type { SavedLearningEntry } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "../ui/button";

const AIAssistantPage = () => {
  const [selectedEntries, setSelectedEntries] = useState([]);

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
    console.log('hello');
  }
  
  return (
    <div>
      AI Assistant Page
      {entryByUserQuery.data.map(e => <li key={e.id}>
        <p>
          Topic: {e.topic}
        </p>
        <p>
          Summary: {e.note}
        </p>
      </li>)}
      <form onSubmit={handleSubmit}>
        <Button>Submit</Button>
      </form>
    </div>
  )
};

export default AIAssistantPage;