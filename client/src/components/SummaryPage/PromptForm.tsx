import { useState, type Dispatch, type SetStateAction } from "react"
import entriesService from "../../service/entriesService";
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
    <section className="mb-16">
      <form onSubmit={handleSubmitPrompt}
        className="bg-surface-container-low p-8 rounded-xl shadow-2xl transition-all hover:bg-surface-container duration-500"
      >
        <label className="block font-headline font-bold text-sm uppercase tracking-widest text-primary mb-4"
          htmlFor="prompt"
        >
          Intellectual Input
        </label>
        <div className="relative group">
          <textarea
            className="w-full h-64 bg-surface-container-lowest text-on-surface font-body p-6 rounded-xl border-none focus:ring-2 focus:ring-primary transition-all resize-none placeholder:text-zinc-600"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
            rows={5}
            cols={50}
          />
          <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-zinc-600 text-xs font-label">
            <span className="material-symbols-outlined text-sm" data-icon="edit_note">edit_note</span>
            {/* <span>Autosaving to local cache</span> */}
          </div>
        </div>
        <div className="mt-8 flex justify-end">

          <button
            className="flex items-center space-x-3 px-8 py-4 bg-linear-to-br from-primary to-primary-dim text-on-primary font-headline font-bold rounded-xl transition-all hover:scale-[1.02] hover:cursor-pointer active:scale-95 shadow-[0_0_40px_rgba(163,166,255,0.08)] disabled:hover:scale-[1] disabled:bg-linear-to-br disabled:from-outline disabled:to-outline disabled:text-black disabled:hover:cursor-default"
            type="submit" disabled={isLoading}
          >
            {openaiResponse
              ?
              <span className="flex justify-center">
                <span
                  className="material-symbols-outlined text-9xl"
                  data-icon="replay"
                  style={{ fontVariationSettings: 'FILL 1' }}
                >
                  replay
                </span>
                Retry
              </span>
              :
              <span className="flex justify-center">
                <span
                  className="material-symbols-outlined text-9xl"
                  data-icon="auto_awesome"
                  style={{ fontVariationSettings: 'FILL 1' }}
                >
                  auto_awesome
                </span>
                Generate Summary
              </span>
            }
          </button>
        </div>
      </form>
    </section>
  )
}

export default PromptForm;