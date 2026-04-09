import { Input } from "../ui/input";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Button } from "../ui/button";
import Togglelable from "../misc/Toggleable";
import type { FilterBy } from "./LearningHistory";

interface LearningEntryFilterProps {
  filterBy: FilterBy;
  topicFilter: string;
  noteFilter: string;
  setFilterBy: React.Dispatch<React.SetStateAction<FilterBy>>
  setTopicFilter: React.Dispatch<React.SetStateAction<string>>
  setNoteFilter: React.Dispatch<React.SetStateAction<string>>
};

const LearningEntryFilter = ({ filterBy, setFilterBy, topicFilter, setTopicFilter, noteFilter, setNoteFilter }: LearningEntryFilterProps) => {

  const handleUpdateFilter = () => {
    setTopicFilter('');
    setNoteFilter('');
    setFilterBy(prev => prev === 'note' ? 'topic' : 'note')
  }

  return (
    <Togglelable text="show filter" className="text-left">
      <Field>
        <FieldGroup>
          {filterBy === 'topic' ? <FieldSet>
            <FieldLabel className="w-full p-4">
              filter by topic title
              <Input value={topicFilter} onChange={(e) => setTopicFilter(e.target.value)} className="w-3/4" />
            </FieldLabel>
            <FieldDescription>type a word to filter by topic</FieldDescription>
          </FieldSet>
          : filterBy === 'note' ? <FieldSet>
            <FieldLabel className="w-full p-4">
              filter by description
              <Input value={noteFilter} onChange={(e) => setNoteFilter(e.target.value)} className="w-3/4" />
            </FieldLabel>
            <FieldDescription>type a word to filter by description</FieldDescription>
          </FieldSet> : null}
          <FieldSet>
            <Button className="w-1/4 mb-4" onClick={handleUpdateFilter}>filter by {filterBy === 'note' ? 'topic' : 'description'}</Button>
          </FieldSet>
        </FieldGroup>
      </Field>
    </Togglelable>
  );
}

export default LearningEntryFilter;