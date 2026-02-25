import type { OpenaiResponse } from "@/types/types";

interface OpenAITopicAndSummaryProps {
  openaiResponse: OpenaiResponse | null;
}

const OpenAITopicAndSummary = ({ openaiResponse }: OpenAITopicAndSummaryProps) => {
  if (!openaiResponse) return null;

  return (
    <div className="p-4">
      <div>
        <p>
          <strong>Topic</strong>: {openaiResponse.topic}
        </p>
        <p>
          <strong>Summary</strong>: {openaiResponse.note}
        </p>
      </div>
    </div>
  )
};

export default OpenAITopicAndSummary;