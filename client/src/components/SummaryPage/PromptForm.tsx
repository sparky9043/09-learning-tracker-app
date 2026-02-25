import { useState, type Dispatch, type SetStateAction } from "react"
import entriesService from "../../service/entriesService";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
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
    <form onSubmit={handleSubmitPrompt}>
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="prompt">User Prompt</FieldLabel>
            <Textarea
              className="resize-none min-h-40"
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isLoading}
              rows={10}
              cols={100}
            />
            <FieldDescription>Enter what you learned. Keep it to 1-2 topics</FieldDescription>
          </Field>
          <Field>
            <Button type="submit" disabled={isLoading}>
              {openaiResponse ? 'try again' : 'summarize!'}
            </Button>
          </Field>
        </FieldGroup>
      </ FieldSet>
    </form>
  )
}

export default PromptForm;