"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./router/users"));
const login_1 = __importDefault(require("./router/login"));
const express_session_1 = __importDefault(require("express-session"));
const config_1 = __importDefault(require("./utils/config"));
const passport_1 = __importDefault(require("passport"));
const middleware_1 = __importDefault(require("./utils/middleware"));
const entries_1 = __importDefault(require("./router/entries"));
const session_file_store_1 = __importDefault(require("session-file-store"));
const morgan_1 = __importDefault(require("morgan"));
const assistant_1 = __importDefault(require("./router/assistant"));
const FileStore = (0, session_file_store_1.default)(express_session_1.default);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static('dist'));
app.use((0, morgan_1.default)('dev'));
app.use((0, express_session_1.default)({
    secret: config_1.default.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    store: new FileStore({
        path: './sessions',
        reapInterval: process.env.NODE_ENV === 'test' ? 1 : 60 * 60,
        ttl: process.env.NODE_ENV === 'test' ? 1 : 60 * 60,
        logFn: () => { }
    }),
    name: 'my.session.id',
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/', login_1.default);
app.use('/api/assistant', assistant_1.default);
app.use('/api/entries', entries_1.default);
app.use('/api/users', users_1.default);
app.use(middleware_1.default.errorHandler);
exports.default = app;
