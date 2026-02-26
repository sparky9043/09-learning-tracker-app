import { NextFunction, Request, Response, Router } from "express";
import { AIGenerateStudyQuestionRequest } from "../types/types";

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
    console.log(req.body);
    res.send('connected');
  } catch (error) {
    next(error);
  }
});

export default assistant;