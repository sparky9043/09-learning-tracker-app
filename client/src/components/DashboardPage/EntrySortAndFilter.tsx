interface LearningEntryFilterProps {
  entryFilter: string;
  updateEntryFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sortBy: string;
  updateSort: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const EntrySortAndFilter = ({
  entryFilter,
  updateEntryFilter,
  sortBy,
  updateSort,
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
        <div className="custom-select-wrapper group relative min-w-55">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-2">
            <span className="text-on-surface-variant font-bold uppercase tracking-wider text-[10px]">Sort:</span>
          </div>
          <select
            className="w-full pl-16 pr-10 py-2.5 bg-surface-container-high text-on-surface font-medium rounded-lg border border-white/5 hover:bg-surface-container-highest transition-all text-sm cursor-pointer focus:ring-1 focus:ring-primary/50 focus:outline-none appearance-none"
            value={sortBy}
            onChange={updateSort}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="longest">Longest Duration</option>
            <option value="shortest">Shortest Duration</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <span
              className="material-symbols-outlined text-lg text-on-surface-variant group-hover:text-on-surface transition-colors"
              data-icon="expand_more">expand_more</span>
          </div>
        </div>
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

export default EntrySortAndFilter;