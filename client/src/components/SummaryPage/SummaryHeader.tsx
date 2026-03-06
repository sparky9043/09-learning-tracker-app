import useOpenaiResponseContext from "@/hooks/useOpenaiResponseContext";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";

const SummaryHeader = () => {
  const { setOpenaiResponse } = useOpenaiResponseContext();
  const navigate = useNavigate();

  const handleBack = () => {
    setOpenaiResponse(null);
    navigate(-1);
  };

  return (
    <div className="flex justify-between">
      <h2 className="capitalize font-bold tracking-wider text-shadow-stone-400 text-shadow-xs">
        AI Summary
      </h2>
      <Button onClick={handleBack}>
        &larr; Back 
      </Button>
    </div>
  )
};

export default SummaryHeader;