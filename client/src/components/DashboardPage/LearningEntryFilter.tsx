import { Input } from "../ui/input";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Button } from "../ui/button";
import Togglelable from "../misc/Toggleable";

interface LearningEntryFilterProps {
  filterBy
  topicFilter
  noteFilter
  setFilterBy
  setTopicFilter
  setNoteFilter
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
  );
}

export default LearningEntryFilter;