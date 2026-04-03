import useOpenaiResponseContext from "@/hooks/useOpenaiResponseContext";
import { useNavigate } from "react-router";
// import { Button } from "../ui/button";

const SummaryHeader = () => {
  const { setOpenaiResponse } = useOpenaiResponseContext();
  const navigate = useNavigate();

  const handleBack = () => {
    setOpenaiResponse(null);
    navigate('/dashboard');
  };

  return (
    <div className="flex justify-between">
      <h2 className="font-headline font-bold text-2xl mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary" data-icon="smart_toy">smart_toy</span>
        Summary
      </h2>
      <button
        className="px-5 py-2 rounded-xl bg-linear-to-br from-primary to-primary-dim text-on-primary font-bold transition-transform scale-95 active:scale-90 font-label text-sm shadow-lg shadow-primary/10 flex items-center justify-between"
        onClick={handleBack}
      >
        <span className="material-symbols-outlined text-sm!">
          arrow_back
        </span>
        Back
      </button>
    </div>
  )
};

export default SummaryHeader;