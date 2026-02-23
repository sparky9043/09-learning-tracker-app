import axios from "axios";
import { type SavedUserResponseObject, type UserCredential } from "../types/types";

const baseUrl = '/api/login'

const login = async (userCredential: UserCredential) => {
  const response = await axios.post<SavedUserResponseObject>(baseUrl, userCredential)
  return response.data;
}

const logout = async (): Promise<void> => {
  await axios.post('/api/logout')
}

export default { login, logout };