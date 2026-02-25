import { Link } from "react-router";

const SummaryHeader = () => {
  return (
    <div className="flex justify-between">
      <h2>
        Summary
      </h2>
      <Link to='/dashboard'>
        &larr; Back 
      </Link>
    </div>
  )
};

export default SummaryHeader;