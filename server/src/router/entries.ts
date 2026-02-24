import { NextFunction, Request, Response, Router } from "express";
import entryQueries from "../../db/entryQueries";
import { LearningEntry, NewLearningEntry, OpenAIResponseSingleEntry, UserPrompt } from "../types/types";
import error from "../errors/error";
import { ParamsDictionary } from 'express-serve-static-core';
import middleware from "../utils/middleware";
import userQueries from "../../db/userQueries";
import openaiQuery from "../../openai/openaiQuery";

const entryRouter = Router();

entryRouter.post(
  '/ai/summarize', // OPENAI API ROUTE
  async (req: Request<ParamsDictionary, unknown, UserPrompt>, res: Response<OpenAIResponseSingleEntry>) => {

  const { prompt } = req.body;
  const responseAI = await openaiQuery.getStructuredResponse(prompt);

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
entryRouter.get('/loggedin', async (req, res: Response<LearningEntry[]>, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.redirect('/authrequired');
    }
    const userId = req.user.id;
    if (req.isAuthenticated()) {
      const learningEntries = await entryQueries.getAllLearningEntriesByUserId(Number(userId));
      return res.json(learningEntries);
    } else {
      throw new Error('userid does not match');
    }
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

entryRouter.post('/loggedin', middleware.validationHandler, async (req: Request<ParamsDictionary, unknown, NewLearningEntry>, res: Response<LearningEntry>, next: NextFunction) => {
  try {
    if (!req.user) { return res.redirect('/authrequired'); }
    const savedLearningEntry = await entryQueries.createLearningEntry(req.body);
    return res.status(201).json(savedLearningEntry);
  } catch(error) {
    next(error);
  }
});

entryRouter.delete('/loggedin/:id', async (req: Request<{ id: string }>, res: Response, next:  NextFunction) => {
  try {
    if (!req.user) { return res.redirect('/authrequired'); }
    const savedUserId = await userQueries.getUserIdByEntryId(req.params.id);

    if (Number(savedUserId.user_id) !== Number(req.user.id)) {
      throw new error.ForbiddenError('access forbidden. user id does not match');
    }

    const result = await entryQueries.deleteEntryById(Number(req.params.id));

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

entryRouter.put('/loggedin/:id', (req: Request<{ id: string }, unknown, NewLearningEntry>, res: Response, next: NextFunction) => {
  try {
    console.log(req.params.id, req.body);

    res.send(200);
  } catch (error) {
    next(error);
  }
});

export default entryRouter;