import { useQuery } from "@tanstack/react-query";
import entriesService from "../../service/entriesService";
import type { SavedLearningEntry } from "../../types/types";
import { useState } from "react";
import { isBefore } from 'date-fns';
import { useCurrentUserContext } from "@/hooks/useCurrentUserContext";
// import LearningEntries from "./LearningEntries";
// import SelectComponent from "../misc/SelectComponent";
// import LearningStats from "./LearningStats";
import EntrySortAndFilter from "./EntrySortAndFilter";
// import AddEntryModal from "./AddEntryModal";
import EntryItemCard from "./EntryItemCard";
import EntryPaginationNav from "./EntryPaginationNav";

export type FilterBy = 'topic' | 'note';

const LearningHistory = () => {
  const { currentUser } = useCurrentUserContext();
  const [sortBy, setSortBy] = useState<string>('newest');
  const [entryFilter, setEntryFilter] = useState<string>('');
  const [pageIndex, setPageIndex] = useState<number>(0);

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

  // const totalTimeSpent = entryByUserQuery.data.map(entry => entry.minutes_spent).reduce((prev, curr) => prev + curr, 0);

  const sortData = (data: SavedLearningEntry[]) => {
    const copy = [...data];
    const sortedData = sortBy === 'oldest'
      ? copy.sort((a, b) => isBefore(a.created_at, b.created_at) ? -1 : 1)
      : sortBy === 'newest' ? copy.sort((a, b) => isBefore(a.created_at, b.created_at) ? 1 : -1)
        : sortBy === 'longest' ? copy.sort((a, b) => a.minutes_spent - b.minutes_spent < 0 ? 1 : -1)
          : sortBy === 'shortest' ? copy.sort((a, b) => a.minutes_spent - b.minutes_spent > 0 ? 1 : -1)
            : copy;
    return sortedData;
  }

  const filterData = (data: SavedLearningEntry[]) => 
      data.filter(entry => 
        entry.topic.toLowerCase().includes(entryFilter.toLowerCase()) ||
        entry.note.toLowerCase().includes(entryFilter.toLowerCase())
      )

  const sortedData = sortData(entryByUserQuery.data);

  const filteredData = filterData(sortedData);

  const totalEntries = filteredData.length;

  const maxPages = Math.ceil(totalEntries / 9);

  const nineEntries = filteredData.slice(pageIndex * 9, (1 + pageIndex) * 9);

  const updateSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageIndex(0);
    setEntryFilter('');
    setSortBy(event.target.value);
  }

  const updateEntryFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageIndex(0);
    setEntryFilter(event.target.value);
  }

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
      {/* Filter & Sort Bar */}
      <EntrySortAndFilter
        sortBy={sortBy}
        updateSort={updateSort}
        entryFilter={entryFilter}
        updateEntryFilter={updateEntryFilter}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {nineEntries.map(entry => <EntryItemCard key={entry.id} entry={entry} />)}
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
        {maxPages > 1 && <EntryPaginationNav
          pageIndex={pageIndex}
          maxPages={maxPages}
          setPageIndex={setPageIndex}
        />}
    </main>
  )
}

export default LearningHistory;