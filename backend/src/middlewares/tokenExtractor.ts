import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { EnvironmentVariable } from "../types";
import config from "../utils/config";

const tokenExtractor: RequestHandler = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = jwt.verify(
      authorization.substring(7),
      config(EnvironmentVariable.JWT_SECRET)
    ) as JwtPayload;
    next();
  } else {
    res.status(401).json({ error: "token missing" });
  }
};

export default tokenExtractor;
