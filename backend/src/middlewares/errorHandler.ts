import { ErrorRequestHandler } from "express";
import {
  isUniqueConstraintError,
  isValidationError,
} from "../utils/typeGuards";

const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (isValidationError(error)) {
    return res.status(422).json({ error: error.message });
  }

  if (isUniqueConstraintError(error)) {
    return res.status(409).json({ error: error.errors[0].message });
  }

  console.error(error);

  next(error);
};

export default errorHandler;
