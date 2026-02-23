import axios from "axios";
import { type OpenaiResponse, type NewLearningEntry, type SavedLearningEntry, type UserPrompt } from "../types/types";

const baseUrl = '/api/entries'

const getAllEntriesByUser = async () => {
  // Noe that the user lost be logged in. Make sure to test it with /authrequired
  const response = await axios.get<SavedLearningEntry[]>(`${baseUrl}/loggedin`);
  return response.data;
};

const createEntryByUser = async (newEntryObject: NewLearningEntry) => {
  const response = await axios.post<SavedLearningEntry>(`${baseUrl}/loggedin`, newEntryObject);
  return response.data;
};

const getOpenAISummaryForEntry = async (promptObject: UserPrompt) => {
  const response = await axios.post<OpenaiResponse>(`${baseUrl}/ai/summarize`, promptObject);
  return response.data;
}

export default {
  getAllEntriesByUser,
  createEntryByUser,
  getOpenAISummaryForEntry,
};