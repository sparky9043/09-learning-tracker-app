import { useState } from "react"
import entriesService from "../../service/entriesService";
import useOpenaiResponseContext from "../../hooks/useOpenaiResponseContext";

const PromptForm = () => {
  const {openaiResponse, setOpenaiResponse} = useOpenaiResponseContext();
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
    <form onSubmit={handleSubmitPrompt}>
      <h3>write a short summary of what you learned</h3>
      <ul>
        <li>
          <label htmlFor="prompt">User Prompt</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
            rows={10}
            cols={100}
          />
        </li>
        <li>
          <button type="submit" disabled={isLoading}>
            {openaiResponse ? 'try again' : 'summarize!'}
          </button>
        </li>
      </ul>
    </form>
  )
}

export default PromptForm;