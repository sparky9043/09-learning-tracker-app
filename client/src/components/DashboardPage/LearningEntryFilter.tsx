// import { Input } from "../ui/input";
// import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
// import { Button } from "../ui/button";
// import Togglelable from "../misc/Toggleable";
import type { FilterBy } from "./LearningHistory";

interface LearningEntryFilterProps {
  filterBy: FilterBy;
  topicFilter: string;
  noteFilter: string;
  setFilterBy: React.Dispatch<React.SetStateAction<FilterBy>>
  setTopicFilter: React.Dispatch<React.SetStateAction<string>>
  setNoteFilter: React.Dispatch<React.SetStateAction<string>>
};

const LearningEntryFilter = ({
      filterBy,
      setFilterBy,
      topicFilter,
      setTopicFilter,
      noteFilter,
      setNoteFilter
    }: LearningEntryFilterProps
  ) => {

  // const handleUpdateFilter = () => {
  //   setTopicFilter('');
  //   setNoteFilter('');
  //   setFilterBy(prev => prev === 'note' ? 'topic' : 'note')
  // }

  return (
    <div className="flex flex-wrap items-center justify-between gap-6 mb-12 py-6 border-y border-white/5">
      <div className="relative inline-block text-left">
        {/* <button aria-expanded="false" aria-haspopup="true"
          className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-high text-on-surface font-medium rounded-lg border border-white/5 hover:bg-surface-container-highest transition-all text-sm"
          id="sort-menu-button" type="button">
          <span className="text-on-surface-variant font-semibold uppercase tracking-wider text-[10px] mr-1">Sort by:</span>
          <span>Date</span>
          <span className="material-symbols-outlined text-lg text-on-surface-variant"
            data-icon="expand_more">expand_more</span>
        </button> */}
      </div>
      <div className="relative group">
        <span
          className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-lg"
          data-icon="search">search</span>
        <input
          className="bg-surface-container-lowest border border-white/5 focus:ring-1 focus:ring-primary/50 focus:border-primary/50 rounded-lg pl-10 pr-4 py-2 w-full md:w-64 text-on-surface text-sm placeholder:text-outline/50 transition-all"
          placeholder="Filter entries by topic..."
          type="text"
          value={topicFilter}
          onChange={(e) => setTopicFilter(e.target.value)}
        />
      </div>
    </div>
    // <Togglelable text="show filter" className="text-left">
    //   <Field>
    //     <FieldGroup>
    //       {filterBy === 'topic' ? <FieldSet>
    //         <FieldLabel className="w-full p-4">
    //           filter by topic title
    //           <Input value={topicFilter} onChange={(e) => setTopicFilter(e.target.value)} className="w-3/4" />
    //         </FieldLabel>
    //         <FieldDescription>type a word to filter by topic</FieldDescription>
    //       </FieldSet>
    //       : filterBy === 'note' ? <FieldSet>
    //         <FieldLabel className="w-full p-4">
    //           filter by description
    //           <Input value={noteFilter} onChange={(e) => setNoteFilter(e.target.value)} className="w-3/4" />
    //         </FieldLabel>
    //         <FieldDescription>type a word to filter by description</FieldDescription>
    //       </FieldSet> : null}
    //       <FieldSet>
    //         <Button className="w-1/4 mb-4" onClick={handleUpdateFilter}>filter by {filterBy === 'note' ? 'topic' : 'description'}</Button>
    //       </FieldSet>
    //     </FieldGroup>
    //   </Field>
    // </Togglelable>
  );
}

export default LearningEntryFilter;