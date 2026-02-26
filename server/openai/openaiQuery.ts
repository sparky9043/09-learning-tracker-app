import error from "../src/errors/error";
import { AIGenerateStudyQuestionResponseSchema, LearningEntryOpenAIResponseSchema } from "../src/schemas/learning-entry-schema";
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

const getAIGeneratedQuestions = async (userEntries: AIUserEntryInput[]) => {
  const entriesString = JSON.stringify(userEntries);

  const response = await openai.responses.parse({
    model: 'gpt-5-mini',
    input: [
      {
        role: 'system',
        content: 'You are an effective generator of study guide questions. You will be receiving a stringified JSON. The JSON has only one property named "concepts" and will be an array of objects each with topic and note keys. Treat each of these as one concept that the user learned. Read each of the title and note and generate 3 questions for each concept that the user sent. Make sure each question does not exceed 100 characters. Your response is an object with one key named "questions". The array will have the same number of concepts sent by the user. Each member of the array will consist of the topic sent by the user and the concept which will contain the 3 questions per topic.',
      },
      {
        role: 'user',
        content: entriesString,
      }
    ],
    text: {
      format: zodTextFormat(AIGenerateStudyQuestionResponseSchema,
        'generated_questions_response',
      ),
    },
  });

  const generated_questions_response = response.output_parsed;

  if (!generated_questions_response) {
    throw new error.HttpError('Internal Server Error');
  }

  return generated_questions_response;
};

export default { getAISummaryResponse, getAIGeneratedQuestions };