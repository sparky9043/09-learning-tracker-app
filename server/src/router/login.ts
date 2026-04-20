import { Request, RequestHandler, Router } from "express";
import passport from "passport";
import { IVerifyOptions, Strategy as LocalStrategy } from "passport-local";
import userQueries from "../../db/userQueries";
import bcrypt from 'bcrypt';
import { NewUser } from "../types/types";
import error from "../errors/error";
import { ParamsDictionary } from "express-serve-static-core";

passport.use(new LocalStrategy(
  { usernameField: 'username' },
  (username: string, password: string, done) => {
    userQueries.getUserByUsernameSensitive(username)
      .then(user => {
        if (!user || !user?.password_hash) throw new error.NotFoundError('username or password incorrect');
        void bcrypt.compare(password, user.password_hash).then(passwordCorrect => {
          if (user && !passwordCorrect) {
            const credentialError = new error.ValidationError('username or password incorrect');
            return done(credentialError, false, { message: 'invalid credentials '}); // wrong password
          }
          
          if (user && passwordCorrect) {
            const { id } = user;
            return done(null, { id, username });
          }
        });
      })
      .catch(error => {
        done(error);
      });
  }
));

passport.serializeUser((user: Express.User, done) => {
  done(null, { id: user.id });
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

const loginRouter = Router();

loginRouter.get('/login', (_req, res) => {
  console.log('inside /login');
  res.send('This is the login page');
});

// login Router
loginRouter.post('/api/login', (req: Request<ParamsDictionary, unknown, NewUser>, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new error.ValidationError('both username and passwords must be filled out');
  };

  (passport.authenticate('local', (err: unknown, user: Express.User, info: IVerifyOptions) => {
    if (err) { return next(err); }
    if (info) { return res.send(info.message); }
    if (!user) { return res.redirect('/login'); }
    req.login(user, (err) => {
      if (err) { return next(err); }
      res.status(201).json({ status: 'success', user });
    });
  }) as RequestHandler)(req, res, next);
});

loginRouter.post('/api/logout', (req, res, next) => {
  console.log('logout triggered');
  req.logout((logoutError) => {
    if (logoutError) next(logoutError);
    res.redirect('/login');
  });
});

loginRouter.get('/authrequired', (req, res) => {
  // console.log('code reached');
  console.log('inside /authrequired');
  if (req.isAuthenticated()) {
    res.json({ status: 'success', user: req.user});
  } else {
    throw new error.ForbiddenError('access forbidden. please make sure you are logged in');
  }
  res.send('hello');
});

export default loginRouter;