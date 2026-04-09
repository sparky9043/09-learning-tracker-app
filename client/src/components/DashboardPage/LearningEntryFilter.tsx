interface LearningEntryFilterProps {
  entryFilter: string;
  updateEntryFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const LearningEntryFilter = ({
      entryFilter,
      updateEntryFilter,
    }: LearningEntryFilterProps
  ) => {

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
          placeholder="Filter entries..."
          type="text"
          value={entryFilter}
          onChange={updateEntryFilter}
        />
      </div>
    </div>
  );
}

export default LearningEntryFilter;