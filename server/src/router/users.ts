import { NextFunction, Request, Response, Router } from "express";
import userQueries from "../../db/userQueries";
import { NewUser, SavedUser, SavedUserSensitive } from "../types/types";
// import { DatabaseError } from "pg";
import error from "../errors/error";
import middleware from "../utils/middleware";

const usersRouter = Router();

// get all users
usersRouter.get('/', async (_req, res: Response<SavedUser[]>, next: NextFunction) => {
  try {
    const users = await userQueries.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.get('/:id', async (req: Request< { id: number }, unknown, unknown>, res: Response<SavedUser>, next) => {
  try {
    if (isNaN(req.params.id)) {
      throw new error.ValidationError('invalid id format');
    }

    const user = await userQueries.getUserById(Number(req.params.id));

    if (!user) {
      throw new error.NotFoundError('user not found');
    } else {
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
});

// create new user
usersRouter.post('/', middleware.newUserValidator, async (req: Request<unknown, unknown, NewUser>, res: Response<SavedUserSensitive>, next: NextFunction) => {
  try {
    const user = await userQueries.createUser(req.body);

    if (user) {
      res.status(201).json(user);
    } else {
      throw new error.HttpError('user could not be created');
    }
  } catch (error) {
    next(error);
  }
});

export default usersRouter;