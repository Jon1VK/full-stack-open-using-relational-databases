import session, { SessionData } from "express-session";
import connectSessionSequelize from "connect-session-sequelize";
import { sequelize } from "./sequalize";
import config from "./config";
import { EnvironmentVariable } from "../types";
import { DataTypes } from "sequelize";

const SequelizeStore = connectSessionSequelize(session.Store);

sequelize.define(
  "sessions",
  {
    sid: {
      type: DataTypes.STRING(36),
      primaryKey: true,
    },
    expires: DataTypes.DATE,
    data: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  },
  {
    underscored: true,
  }
);

const store = new SequelizeStore({
  db: sequelize,
  table: "sessions",
  extendDefaultFields: (defaults, session: SessionData) => ({
    ...defaults,
    user_id: session.userId,
  }),
});

export default session({
  secret: config(EnvironmentVariable.SESSION_SECRET),
  store,
  resave: false,
  saveUninitialized: true,
});
