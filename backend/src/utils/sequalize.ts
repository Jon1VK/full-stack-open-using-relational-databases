import { Sequelize } from "sequelize";
import { EnvironmentVariable } from "../types";
import config from "./config";

export const sequelize = new Sequelize(
  config(EnvironmentVariable.DATABASE_URL)
);
