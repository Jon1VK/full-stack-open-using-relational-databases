import { UniqueConstraintError, ValidationError } from "sequelize/types";
import { ErrorName } from "../types";

export const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

export const isValidationError = (error: unknown): error is ValidationError => {
  return isError(error) && error.name === ErrorName.ValidationError;
};

export const isUniqueConstraintError = (
  error: unknown
): error is UniqueConstraintError => {
  return isError(error) && error.name === ErrorName.UniqueConstraintError;
};
