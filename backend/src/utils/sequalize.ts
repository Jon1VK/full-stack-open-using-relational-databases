import { Sequelize } from "sequelize";
import { SequelizeStorage, Umzug, UmzugOptions } from "umzug";
import { EnvironmentVariable } from "../types";
import config from "./config";

export const sequelize = new Sequelize(
  config(EnvironmentVariable.DATABASE_URL)
);

const umzuqOptions: UmzugOptions<object> = {
  migrations: {
    glob: "./src/migrations/*.ts",
  },
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

export const runMigrations = async () => {
  const migrator = new Umzug(umzuqOptions);
  const migrations = await migrator.up();
  console.log("Migrations up to date", {
    files: migrations.map((migration) => migration.name),
  });
};

export const rollbackMigration = async () => {
  const migrator = new Umzug(umzuqOptions);
  const migration = await migrator.down();
  console.log(`Migration ${migration[0].name} down`);
};
