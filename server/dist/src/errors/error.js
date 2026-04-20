"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpError extends Error {
    constructor(message = 'Internal Server Error', status = 500) {
        super(message);
        this.message = message;
        this.status = status;
        this.status = status;
    }
}
class ValidationError extends HttpError {
    constructor(message, status = 400) {
        super(message, status);
        this.message = message;
        this.status = status;
    }
}
class AuthenticationError extends HttpError {
    constructor(message, status = 401) {
        super(message, status);
        this.message = message;
        this.status = status;
    }
}
class ForbiddenError extends HttpError {
    constructor(message, status = 403) {
        super(message, status);
        this.message = message;
        this.status = status;
    }
}
class NotFoundError extends HttpError {
    constructor(message, status = 404) {
        super(message, status);
        this.message = message;
        this.status = status;
    }
}
exports.default = {
    HttpError,
    ValidationError,
    AuthenticationError,
    ForbiddenError,
    NotFoundError,
};
