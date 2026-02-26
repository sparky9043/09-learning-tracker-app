import { NextFunction, Request, Response, Router } from "express";
import { AIGenerateStudyQuestionRequest } from "../types/types";
import openaiQuery from "../../openai/openaiQuery";

const assistant = Router();

assistant.get('/', (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.send('connected');
  } catch (error) {
    next(error);
  }
});

assistant.post('/', (req: Request<unknown, unknown, AIGenerateStudyQuestionRequest>, res: Response, next: NextFunction) => {
  try {
    const { concepts } = req.body;
    
    const generatedQuestions = openaiQuery.getAIGeneratedTopics(concepts);
    console.log(generatedQuestions);
    res.send('connected');
  } catch (error) {
    next(error);
  }
});

export default assistant;