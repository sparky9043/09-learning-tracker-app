import express from 'express';
import usersRouter from './router/users';
import loginRouter from './router/login';
import session from 'express-session';
import config from './utils/config';
import passport from 'passport';
import middleware from './utils/middleware';
import entryRouter from './router/entries';
import SessionFileStore from 'session-file-store';
import morgan from 'morgan';
import assistantRouter from './router/assistant';

const FileStore = SessionFileStore(session);

const app = express();
app.use(express.json());

app.use(express.static('dist'));

app.use(morgan('dev'));

app.use(session({
  secret: config.SESSION_SECRET!,
  saveUninitialized: true,
  resave: false,
  store: new FileStore({
    path: './sessions',
    reapInterval: process.env.NODE_ENV === 'test' ? 1 : 60 * 60,
    ttl: process.env.NODE_ENV === 'test' ? 1 : 60 * 60,
    logFn: () => {}
  }),
  name: 'my.session.id',
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', loginRouter);
app.use('/api/assistant', assistantRouter);
app.use('/api/entries', entryRouter);
app.use('/api/users', usersRouter);

app.use(middleware.errorHandler);

export default app;