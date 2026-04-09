interface DisplayPageNumberProps {
  pageIndex: number;
  maxPages: number;
}

const DisplayPageNumber = (props: DisplayPageNumberProps) => {
  return (
    <div className="flex justify-end mb-6 -mt-6">
      <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-[0.2em]">Page {props.pageIndex + 1} of {props.maxPages}</span>
    </div>
  )
}

export default DisplayPageNumber;