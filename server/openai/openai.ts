import OpenAI from "openai";
import config from "../src/utils/config";

const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY,
});

export default openai;