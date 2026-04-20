import { NextFunction, Request, Response, Router } from "express";
import entryQueries from "../../db/entryQueries";
import { LearningEntry, NewLearningEntry, OpenAIResponseSingleEntry, UserPrompt } from "../types/types";
import error from "../errors/error";
import { ParamsDictionary } from 'express-serve-static-core';
import middleware from "../utils/middleware";
import openaiQuery from "../../openai/openaiQuery";

const entryRouter = Router();

entryRouter.post(
  '/ai/summarize', // OPENAI API ROUTE
  async (req: Request<ParamsDictionary, unknown, UserPrompt>, res: Response<OpenAIResponseSingleEntry>) => {

  const { prompt } = req.body;
  const responseAI = await openaiQuery.getAISummaryResponse(prompt);

  if (!responseAI.note || !responseAI.topic) {
    throw new error.ValidationError('openai should return both the note and the title of the topic');
  }

  return res.status(201).json(responseAI);
});

entryRouter.get('/', async (_req, res: Response<LearningEntry[]>, next: NextFunction) => {
  try {
    const learningEntries = await entryQueries.getLearningEntries();
    res.json(learningEntries);
  } catch (error) {
    next(error);
  }
});

// read more about redirect and then see if you can do it correctly
entryRouter.get('/', async (req, res: Response<LearningEntry[]>, next: NextFunction) => {
  try {
    const userId = req.user!.id;

    const learningEntries = await entryQueries.getAllLearningEntriesByUserId(Number(userId));
    res.json(learningEntries);

  } catch (error: unknown) {
    next(error);
  }
});

entryRouter.get('/:id', async (req: Request<{ id: string }>, res: Response<LearningEntry>, next: NextFunction) => {
  try {
    if (isNaN(Number(req.params.id))) {
      throw new error.ValidationError('invalid format id');
    }

    const learningEntry = await entryQueries.getLearningEntryById(Number(req.params.id));
    res.json(learningEntry);
  } catch (error) {
    next(error);
  }
});

entryRouter.post('/', middleware.newLearningEntryValidator, async (req: Request<ParamsDictionary, unknown, NewLearningEntry>, res: Response<LearningEntry>, next: NextFunction) => {
  try {

    const savedLearningEntry = await entryQueries.createLearningEntry(req.body);
    res.status(201).json(savedLearningEntry);

  } catch(error) {
    next(error);
  }
});

entryRouter.delete('/:id', async (req: Request<{ id: string }>, res: Response, next:  NextFunction) => {
  try {

    const result = await entryQueries.deleteEntryById(Number(req.params.id));

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

entryRouter.put('/:id', async (req: Request<{ id: string }, unknown, NewLearningEntry>, res: Response, next: NextFunction) => {
  try {

    const savedEntry = await entryQueries.updateLearningEntry(Number(req.params.id), req.body);
    
    res.send(savedEntry);
  } catch (error) {
    next(error);
  }
});

export default entryRouter;