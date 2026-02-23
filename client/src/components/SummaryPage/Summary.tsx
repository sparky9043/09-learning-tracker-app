import PromptForm from "./PromptForm";
// import type { OpenaiResponse } from "../../types/types";
import { Link } from "react-router";
import AddAiSummaryForm from "./AddAiSummaryForm";
import Togglelable from "../misc/Toggleable";
import useOpenaiResponseContext from "../../hooks/useOpenaiResponseContext";

const Summary = () =>  {
  const { openaiResponse } = useOpenaiResponseContext();

  return (
    <div>
      <h2>
        Summary
      </h2>
      <Link to='/dashboard'>Back</Link>
      <PromptForm />
      <div>
        {
          openaiResponse !== null
            ? <div>
                <p>
                  <strong>Topic</strong>: {openaiResponse.topic}
                </p>
                <p>
                  <strong>Summary</strong>: {openaiResponse.note}
                </p>
              </div>
            : null
        }
      </div>
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
  )
};

export default Summary;