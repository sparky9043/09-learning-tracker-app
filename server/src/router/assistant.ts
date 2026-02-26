import { NextFunction, Request, Response, Router } from "express";

const assistant = Router();

assistant.get('/', (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.send('connected');
  } catch (error) {
    next(error);
  }
});

export default assistant;