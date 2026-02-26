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

assistant.post('/', async (req: Request<unknown, unknown, AIGenerateStudyQuestionRequest>, res: Response, next: NextFunction) => {
  try {
    const { concepts } = req.body;
    
    const generatedQuestions = await openaiQuery.getAIGeneratedQuestions(concepts);
    res.json(generatedQuestions);
  } catch (error) {
    next(error);
  }
});

export default assistant;