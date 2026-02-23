import 'express-serve-static-core';

declare global {
  namespace Express {
    interface User {
      id: string;
      username?: string;
    }
  }
}