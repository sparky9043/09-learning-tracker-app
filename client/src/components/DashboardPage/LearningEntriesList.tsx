import { useQuery } from "@tanstack/react-query";
import entriesService from "../../service/entriesService";
import type { SavedLearningEntry } from "../../types/types";
// import { useCurrentUserContext } from "../../hooks/useCurrentUserContext";
// import Togglelable from "../Toggleable";
import AddLearningEntryForm from "./AddLearningEntryForm";
// import { useCurrentUserContext } from "../../hooks/useCurrentUserContext";
import { useState } from "react";
import { isBefore } from 'date-fns';
// import { useCurrentUserStore } from "@/stores/currentUserStore";
import { useCurrentUserContext } from "@/hooks/useCurrentUserContext";
import LearningEntries from "./LearningEntries";
// import { Dialog } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
// import { Card, CardHeader } from "../ui/card";
// import { Label } from "../ui/label";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import Togglelable from "../misc/Toggleable";
import SelectComponent from "../misc/SelectComponent";
import LearningStats from "./LearningStats";
import AddEntryDialog from "./AddEntryDialog";
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
// import { useRef } from "react";
// import useCheckAuth from "../../hooks/useCheckAuth";
// import { useCurrentUserContext } from "../../hooks/useCurrentUserContext";

// type SortBy = 'default' | 'oldest' | 'newest' | 'longest time' | 'shortest time';
type FilterBy = 'topic' | 'note';

const LearningEntriesList = () => {
  const { currentUser } = useCurrentUserContext();
  const [sortBy, setSortBy] = useState<string>('default');
  const [filterBy, setFilterBy] = useState<FilterBy>('note');
  const [showModal, setShowModal] = useState<boolean>(false);
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

  const handleUpdateFilter = () => {
    setTopicFilter('');
    setNoteFilter('');
    setFilterBy(prev => prev === 'note' ? 'topic' : 'note')
  }

  return (
    <div className="p-8 relative">
        {showModal &&
          <AddEntryDialog className="w-full top-4 bottom-0 p-4 flex flex-col items-center h-dvh sticky">
            <Button
              className="absolute right-0 rounded-lg hover:cursor-pointer hover:bg-red-200"
              variant="ghost"
              onClick={() => setShowModal(false)}
            > x </Button>
            <AddLearningEntryForm setShowModal={setShowModal} />
          </AddEntryDialog>}
      <Button onClick={() => setShowModal(true)}>add entry</Button>
      <Togglelable text="show filter" className="text-left">
        <Field>
          <FieldGroup>
            {filterBy === 'topic' ? <FieldSet>
              <FieldLabel>
                filter by topic title
              </FieldLabel>
              <Input value={topicFilter} onChange={(e) => setTopicFilter(e.target.value)} />
              <FieldDescription>type a word to filter by topic</FieldDescription>
            </FieldSet>
            : filterBy === 'note' ? <FieldSet>
              <FieldLabel>
                filter by description
              </FieldLabel>
              <Input value={noteFilter} onChange={(e) => setNoteFilter(e.target.value)} />
              <FieldDescription>type a word to filter by description</FieldDescription>
            </FieldSet> : null}
            <FieldSet>
              <Button className="w-1/4 mb-4" onClick={handleUpdateFilter}>filter by {filterBy === 'note' ? 'topic' : 'description'}</Button>
            </FieldSet>
          </FieldGroup>
        </Field>
      </Togglelable>
      <LearningStats totalTimeSpent={totalTimeSpent} />
      <SelectComponent
        value={sortBy}
        onChange={setSortBy}
        options={['default', 'newest', 'oldest', 'longest time', 'shortest time']}
        className="text-center border-2 border-stone-200 rounded-md"
      />

      {isDataLoaded && <LearningEntries data={filteredData} />}
    </div>
  )
}

export  default LearningEntriesList;