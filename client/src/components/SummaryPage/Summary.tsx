import PromptForm from "./PromptForm";
// import type { OpenaiResponse } from "../../types/types";
import AddAiSummaryForm from "./AddAiSummaryForm";
import Togglelable from "../misc/Toggleable";
import useOpenaiResponseContext from "../../hooks/useOpenaiResponseContext";
import SummaryHeader from "./SummaryHeader";
import OpenAITopicAndSummary from "./OpenAITopicAndSummary";

const Summary = () =>  {
  const { openaiResponse, setOpenaiResponse } = useOpenaiResponseContext();

  return (
    <div className="flex justify-center p-4">
      <div className="flex flex-col w-1/2 p-8 border-2 border-stone-200 shadow-xl rounded-md ">
        <SummaryHeader />
        <PromptForm
          openaiResponse={openaiResponse}
          setOpenaiResponse={setOpenaiResponse}
        />
        <OpenAITopicAndSummary openaiResponse={openaiResponse} />
        {
          openaiResponse
            ? 
              <div>
                <p>
                  are you satisfied with this summary? If not, click the retry button
                </p>
                <p>
                  If you are, click below to open forms
                </p>
                <Togglelable text="use ai response">
                  <AddAiSummaryForm />
                </Togglelable>
              </div>
            : null
        }
      </div>
    </div>
  )
};

export default Summary;