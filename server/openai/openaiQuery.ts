import error from "../src/errors/error";
import { LearningEntryOpenAIResponseSchema } from "../src/schemas/learning-entry-schema";
import { AIUserEntryInput, OpenAIResponseSingleEntry } from "../src/types/types";
import openai from "./openai";
import { zodTextFormat } from 'openai/helpers/zod';

const getAISummaryResponse = async (userPrompt: string): Promise<OpenAIResponseSingleEntry> => {
  const response = await openai.responses.parse({
    model: 'gpt-5-mini',
    input: [
      {
        role: 'system',
        content: 'You are an efficient summarizer of learned topics. Summarize what the user learned into 2 categories: 1) A suitable "title" of the topic learned and 2) "note" which is a one-sentence summary of what the user learned. If the summary covers more two topics, you can use two stentences at most. Do not refer to the user as "you". Use "I"',
      }, {
        role: 'user',
        content: userPrompt,
      }
    ],
    text: {
      format: zodTextFormat(LearningEntryOpenAIResponseSchema, 'learning_entry_response'),
    },
  });

  const learning_entry_response = response.output_parsed;

  if (!learning_entry_response) {
    throw new error.HttpError('Internal Server Error.');
  }

  return learning_entry_response;
};

const getAIGeneratedTopics = (userEntries: AIUserEntryInput[]) => {
  const entriesString = JSON.stringify(userEntries);
  console.log(entriesString);
};

export default { getAISummaryResponse, getAIGeneratedTopics };