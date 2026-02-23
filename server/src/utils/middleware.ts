import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import { DatabaseError } from "pg";
import error from "../errors/error";
import { NewLearningEntrySchema } from "../schemas/learning-entry-schema";
import { ZodError } from "zod";
import { ParamsDictionary } from 'express-serve-static-core';
import { NewUser } from "../types/types";
import { NewUserSchema } from "../schemas/user-schema";
// import { ZodError } from "zod";

// validation middleware
const validationHandler = (req: Request, _res: Response, next: NextFunction) => {
  try {
    console.log('validationHandler reached');
    req.body = NewLearningEntrySchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

const errorHandler = (err: unknown, _req: Request, res: Response, next: NextFunction) => {
  
  if (err instanceof DatabaseError) {
    res.status(500).json({ error: err.message });
  }

  if (err instanceof error.HttpError) {
    res.status(Number(err.status || 500))
      .json({
        status: 'error',
        message: err.message || 'Internal Server Error',
      });
  }

  if (err instanceof ZodError) {
    res.status(400)
      .json({
        status: 'error',
        message: err.message,
      });
  }

  if (err instanceof Error) {
    console.log('inside errorHandler', err.message);
  }

  next();
};

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

const newUserValidator = (req: Request<ParamsDictionary, unknown, NewUser>, _res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new error.ValidationError('both username and password must be filled out');
  }

  req.body = NewUserSchema.parse({ username, password });  

  next();
};

export default {
  errorHandler,
  validationHandler,
  hashPassword,
  newUserValidator,
};