import { NextFunction, Request, Response, Router } from "express";
import { AIGenerateStudyQuestionRequest } from "../types/types";
import openaiQuery from "../../openai/openaiQuery";
import error from "../errors/error";

const assistant = Router();

// assistant.get('/', (_req: Request, res: Response, next: NextFunction) => {
//   try {
//     res.send('connected');
//   } catch (error) {
//     next(error);
//   }
// });

assistant.post('/', async (req: Request<unknown, unknown, AIGenerateStudyQuestionRequest>, res: Response, next: NextFunction) => {
  try {
    if (!req.user) { res.redirect('/authrequired'); }

    const { concepts } = req.body;

    if (!concepts || !Array.isArray(concepts) || concepts.length == 0 || concepts.some(concept => !concept.note || !concept.topic)) {
      throw new error.ValidationError('please submit the proper format of note and topic');
    }

    const generatedQuestions = await openaiQuery.getAIGeneratedQuestions(concepts);
    res.json(generatedQuestions);
  } catch (error) {
    next(error);
  }
});

export default assistant;