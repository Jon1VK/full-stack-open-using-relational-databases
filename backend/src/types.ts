import { ReadingList, User } from "./models";
import Blog from "./models/blog";

declare module "express-serve-static-core" {
  interface Request {
    currentUser: User;
    blog: Blog;
    user: User;
    readingList: ReadingList;
  }
}

declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

export enum EnvironmentVariable {
  DATABASE_URL = "DATABASE_URL",
  PORT = "PORT",
  SESSION_SECRET = "SESSION_SECRET",
}

export enum ErrorName {
  ValidationError = "SequelizeValidationError",
  UniqueConstraintError = "SequelizeUniqueConstraintError",
}

export type EnvironmentVariables = Record<EnvironmentVariable, string>;
