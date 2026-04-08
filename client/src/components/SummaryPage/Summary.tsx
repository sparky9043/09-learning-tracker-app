import PromptForm from "./PromptForm";
import AddAiSummaryForm from "./AddAiSummaryForm";
import useOpenaiResponseContext from "../../hooks/useOpenaiResponseContext";
import SummaryHeader from "./SummaryHeader";
import OpenAITopicAndSummary from "./OpenAITopicAndSummary";

const Summary = () => {
  const { openaiResponse, setOpenaiResponse } = useOpenaiResponseContext();

  console.log(openaiResponse);

  return (
    <main className="max-w-4xl mx-auto px-6 pt-32 pb-12">
      <SummaryHeader />
      <PromptForm
        openaiResponse={openaiResponse}
        setOpenaiResponse={setOpenaiResponse}
      />

      {openaiResponse
        &&
        <>
          <OpenAITopicAndSummary openaiResponse={openaiResponse} />
          <AddAiSummaryForm openaiResponse={openaiResponse} />
        </>
      }

    </main>
  )
};

export default Summary;