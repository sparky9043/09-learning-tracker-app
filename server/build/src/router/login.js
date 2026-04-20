"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const userQueries_1 = __importDefault(require("../../db/userQueries"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_1 = __importDefault(require("../errors/error"));
passport_1.default.use(new passport_local_1.Strategy({ usernameField: 'username' }, (username, password, done) => {
    userQueries_1.default.getUserByUsernameSensitive(username)
        .then(user => {
        if (!user || !(user === null || user === void 0 ? void 0 : user.password_hash))
            throw new error_1.default.NotFoundError('username or password incorrect');
        void bcrypt_1.default.compare(password, user.password_hash).then(passwordCorrect => {
            if (user && !passwordCorrect) {
                const credentialError = new error_1.default.ValidationError('username or password incorrect');
                return done(credentialError, false, { message: 'invalid credentials ' }); // wrong password
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
}));
passport_1.default.serializeUser((user, done) => {
    done(null, { id: user.id });
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
const loginRouter = (0, express_1.Router)();
loginRouter.get('/login', (_req, res) => {
    console.log('inside /login');
    res.send('This is the login page');
});
// login Router
loginRouter.post('/api/login', (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new error_1.default.ValidationError('both username and passwords must be filled out');
    }
    ;
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (info) {
            return res.send(info.message);
        }
        if (!user) {
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            res.status(201).json({ status: 'success', user });
        });
    })(req, res, next);
});
loginRouter.post('/api/logout', (req, res, next) => {
    console.log('logout triggered');
    req.logout((logoutError) => {
        if (logoutError)
            next(logoutError);
        res.redirect('/login');
    });
});
loginRouter.get('/authrequired', (req, res) => {
    // console.log('code reached');
    console.log('inside /authrequired');
    if (req.isAuthenticated()) {
        res.json({ status: 'success', user: req.user });
    }
    else {
        throw new error_1.default.ForbiddenError('access forbidden. please make sure you are logged in');
    }
    res.send('hello');
});
exports.default = loginRouter;
