interface EntryPaginationNavProps {
  pageIndex: number;
  maxPages: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}


const EntryPaginationNav = ({ pageIndex, maxPages, setPageIndex }: EntryPaginationNavProps) => {

  const handlePrevious = (pageIndex: number) => {
    if (pageIndex > 0) {
      setPageIndex(prev => prev - 1);
    }
  }

  const handleNext = (pageIndex: number) => {
    if (pageIndex + 1 < maxPages) {
      setPageIndex(prev => prev + 1);
    }
  }
  const paginationButtons = (maxPages: number) =>
    Array.from({ length: maxPages }, (_, i) => {
      const pageNumber = i + 1;

      let buttonStyles: string;

      if (i == pageIndex) {
        buttonStyles = "w-10 h-10 rounded-lg bg-primary text-on-primary font-bold text-sm shadow-md hover:cursor-pointer"
      } else {
        buttonStyles = "w-10 h-10 rounded-lg text-on-surface-variant hover:bg-white/5 transition-colors font-semibold text-sm hover:cursor-pointer"
      }

      return (
        <button
          key={pageNumber}
          className={buttonStyles}
          onClick={() => setPageIndex(i)}
        >
          {pageNumber}
        </button>
      )
    }
    );

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2">
      <button
        className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors disabled:opacity-30 disabled:pointer-events-none"
        onClick={() => handlePrevious(pageIndex)}
      >
        <span className="material-symbols-outlined text-lg" data-icon="chevron_left">chevron_left</span>
        Previous
      </button>
      <div className="flex items-center gap-1 mx-4">
        {paginationButtons(maxPages)}
      </div>
      <button
        className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
        onClick={() => handleNext(pageIndex)}
      >
        Next
        <span
          className="material-symbols-outlined text-lg" data-icon="chevron_right"
        >
          chevron_right
        </span>
      </button>
    </nav>
  )
}

export default EntryPaginationNav;