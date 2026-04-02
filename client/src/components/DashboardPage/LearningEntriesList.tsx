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
import EntryItemCard from "./EntryItemCard";

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
    <main className="pt-32 pb-20 px-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-3">
          <h1 className="text-5xl md:text-6xl font-headline font-bold tracking-tight text-on-surface">
            Learning History
          </h1>
          <p className="text-on-surface-variant text-base max-w-md">
            A curated archive of your intellectual progress and deep-work sessions.
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-6 py-3 bg-linear-to-br from-primary to-primary-dim text-on-primary rounded-xl font-headline font-bold transition-all shadow-sm">
          <span className="material-symbols-outlined text-[20px]" data-icon="add">add</span>
          Add New Entry
        </button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {sortedData.map(entry => <EntryItemCard key={entry.id} entry={entry} />)}
        {/* <div
          className="group bg-surface-container-low p-6 rounded-xl hover:bg-surface-container transition-all duration-300 refined-border">
          <div className="flex justify-between items-start mb-6">
            <div
              className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined text-xl" data-icon="code">code</span>
            </div>
          </div>
          <h3 className="text-xl font-headline font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
            Mastering React Hooks</h3>
          <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">Deep dive into useEffect and custom hook
            patterns for state management.</p>
          <div className="flex items-center justify-between pt-5 border-t border-white/5">
            <div className="flex items-center gap-2 text-on-surface-variant text-xs font-medium">
              <span className="material-symbols-outlined text-sm" data-icon="calendar_today">calendar_today</span>
              Oct 24, 2023
            </div>
            <div className="flex items-center gap-2 text-primary font-semibold text-xs">
              <span className="material-symbols-outlined text-sm" data-icon="schedule">schedule</span>
              2h 15m
            </div>
          </div>
        </div> */}
      </div>
      {/* <AddEntryModal />
        <LearningEntryFilter
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        topicFilter={topicFilter}
        setTopicFilter={setTopicFilter}
        noteFilter={noteFilter}
        setNoteFilter={setNoteFilter}
        /> */}
      {/* <LearningStats totalTimeSpent={totalTimeSpent} /> */}
      {/* <SelectComponent
          value={sortBy}
          onChange={setSortBy}
          options={['newest', 'oldest', 'longest time', 'shortest time']}
          className="text-center border-2 border-stone-200 rounded-md"
          /> */}

      {/* {isDataLoaded && <LearningEntries data={filteredData} />}
         */}

    </main>
  )
}

export default LearningEntriesList;