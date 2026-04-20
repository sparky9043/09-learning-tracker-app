import axios from "axios";
import type { UserCredential } from "@/types/types";

const baseUrl = '/api/users';

const getUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const createUser = async (userCredential: UserCredential) => {
  const response = await axios.post(baseUrl, userCredential);
  return response.data;
};

export default { getUsers, createUser };