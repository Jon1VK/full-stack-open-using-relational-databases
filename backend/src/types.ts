import { JwtPayload } from "jsonwebtoken";
import { User } from "./models";
import Blog from "./models/blog";

declare module "jsonwebtoken" {
  interface JwtPayload {
    userId: number;
  }
}

declare module "express-serve-static-core" {
  interface Request {
    token: JwtPayload;
    currentUser: User;
    blog: Blog;
    user: User;
  }
}

export enum EnvironmentVariable {
  DATABASE_URL = "DATABASE_URL",
  PORT = "PORT",
  JWT_SECRET = "JWT_SECRET",
}

export enum ErrorName {
  ValidationError = "SequelizeValidationError",
  UniqueConstraintError = "SequelizeUniqueConstraintError",
}

export type EnvironmentVariables = Record<EnvironmentVariable, string>;
