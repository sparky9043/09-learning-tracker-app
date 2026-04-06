import { useState, type Dispatch, type SetStateAction } from "react"
import entriesService from "../../service/entriesService";
// import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
// import { Textarea } from "../ui/textarea";
// import { Button } from "../ui/button";
import type { OpenaiResponse } from "@/types/types";

interface PromptFormProps {
  openaiResponse: OpenaiResponse | null;
  setOpenaiResponse: Dispatch<SetStateAction<OpenaiResponse | null>>;
}

const PromptForm = ({ openaiResponse, setOpenaiResponse }: PromptFormProps) => {
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmitPrompt = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      setIsLoading(true);
      if (!prompt) {
        throw new Error('please make sure you fill out the prompt');
      }

      if (openaiResponse) {
        setOpenaiResponse(null);
      }

      const userPrompt = {
        prompt,
      }

      const response = await entriesService.getOpenAISummaryForEntry(userPrompt);

      if (!response.note || !response.topic) {
        throw new Error('there was an error in the response');
      }
      setOpenaiResponse(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-surface-container p-8 rounded-xl shadow-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <span className="material-symbols-outlined text-9xl" style={{ fontVariationSettings: 'FILL 1' }}>add_circle</span>
      </div>
      <form onSubmit={handleSubmitPrompt} className="space-y-6 relative z-10">
        <div>

          <label htmlFor="prompt">
            Enter what you learned below to generate AI summary
          </label>
          <textarea
            className="w-full bg-surface-container-lowest border-none ring-2 ring-transparent focus:ring-primary rounded-lg p-4 text-on-surface placeholder:text-outline transition-all resize-none"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
            rows={5}
            cols={50}
          />
          <div>
            <button
              className="w-full bg-linear-to-br from-primary to-primary-dim text-on-primary font-extrabold py-4 rounded-xl transition-all hover:shadow-[0_0_30px_rgba(163,166,255,0.3)] active:scale-[0.98] hover:cursor-pointer"
              type="submit" disabled={isLoading}
            >
              {openaiResponse ?
                <span className="flex justify-center">
                  <span className="material-symbols-outlined text-9xl" style={{ fontVariationSettings: 'FILL 1' }}>replay</span>
                  Retry
                </span>
                : 'Submit'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PromptForm;