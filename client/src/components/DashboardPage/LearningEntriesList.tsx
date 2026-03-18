import { useQuery } from "@tanstack/react-query";
import entriesService from "../../service/entriesService";
import type { SavedLearningEntry } from "../../types/types";
import { useState } from "react";
import { isBefore } from 'date-fns';
import { useCurrentUserContext } from "@/hooks/useCurrentUserContext";
import LearningEntries from "./LearningEntries";
import SelectComponent from "../misc/SelectComponent";
import LearningStats from "./LearningStats";
import LearningEntryFilter from "./LearningEntryFilter";
import AddEntryModal from "./AddEntryModal";

export type FilterBy = 'topic' | 'note';

const LearningEntriesList = () => {
  const { currentUser } = useCurrentUserContext();
  const [sortBy, setSortBy] = useState<string>('newest');
  const [filterBy, setFilterBy] = useState<FilterBy>('note');
  const [topicFilter, setTopicFilter] = useState<string>('');
  const [noteFilter, setNoteFilter] = useState<string>('');
  
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

  const isDataLoaded = Array.isArray(entryByUserQuery.data);

  if (currentUser && !isDataLoaded) {
    return (
      <div>
        Session expired. Please log out and try again
      </div>
    )
  }

  const totalTimeSpent = entryByUserQuery.data.map(entry => entry.minutes_spent).reduce((prev, curr) => prev + curr, 0);

  const sortData = (data: SavedLearningEntry[]) => {
    const copy = [...data];
    const sortedData = sortBy === 'oldest'
      ? copy.sort((a, b) => isBefore(a.created_at, b.created_at) ? -1 : 1)
        : sortBy === 'newest' ? copy.sort((a, b) => isBefore(a.created_at, b.created_at) ? 1 : -1)
        : sortBy === 'longest time' ? copy.sort((a, b) => a.minutes_spent - b.minutes_spent < 0 ? 1 : -1)
        : sortBy === 'shortest time' ? copy.sort((a, b) => a.minutes_spent - b.minutes_spent > 0 ? 1 : -1)
        : copy;
    return sortedData;
  }

  const filterData = (data: SavedLearningEntry[]) => {
    const filteredData = filterBy === 'topic'
      ? data.filter(entry => entry.topic.toLowerCase().includes(topicFilter.toLowerCase()))
      : data.filter(entry => entry.note.toLowerCase().includes(noteFilter.toLowerCase()))
    return filteredData;
  }

  const sortedData = sortData(entryByUserQuery.data);

  const filteredData = filterData(sortedData);

  return (
    <div className="text-center flex min-h-dvh w-full">
      <div className="p-8 relative w-full">
        <AddEntryModal />
        <LearningEntryFilter
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          topicFilter={topicFilter}
          setTopicFilter={setTopicFilter}
          noteFilter={noteFilter}
          setNoteFilter={setNoteFilter}
        />
        <LearningStats totalTimeSpent={totalTimeSpent} />
        <SelectComponent
          value={sortBy}
          onChange={setSortBy}
          options={['newest', 'oldest', 'longest time', 'shortest time']}
          className="text-center border-2 border-stone-200 rounded-md"
        />

        {isDataLoaded && <LearningEntries data={filteredData} />}
      </div>
    </div>
  )
}

export  default LearningEntriesList;