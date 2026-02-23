class HttpError extends Error {
  constructor(public message = 'Internal Server Error', public status = 500) {
    super(message);
    this.status = status;
  }
}

class ValidationError extends HttpError {
  constructor (public message: string, public status = 400) {
    super(message, status);
  }
}

class AuthenticationError extends HttpError {
  constructor (public message: string, public status = 401) {
    super(message, status);
  }
}

class ForbiddenError extends HttpError {
  constructor (public message: string, public status = 403) {
    super(message, status);
  }
}

class NotFoundError extends HttpError {
  constructor (public message: string, public status = 404) {
    super(message, status);
  }
}

export default {
  HttpError,
  ValidationError,
  AuthenticationError,
  ForbiddenError,
  NotFoundError,
};