import { EnvironmentVariable } from "../types";

let environmentVariables: Record<EnvironmentVariable, string>;

const initEnvironmentVariables = () => {
  environmentVariables = Object.values(EnvironmentVariable).reduce(
    (memo, variable) => {
      memo[variable] = getEnvironmentVariable(variable);
      return memo;
    },
    {} as Record<EnvironmentVariable, string>
  );
};

const getEnvironmentVariable = (environmentVariable: EnvironmentVariable) => {
  const value = process.env[environmentVariable];
  if (!value) {
    throw new Error(`Undefined environment variable: '${environmentVariable}'`);
  }
  return value;
};

const config = (environmentVariable: EnvironmentVariable) => {
  if (!environmentVariables) initEnvironmentVariables();
  return environmentVariables[environmentVariable];
};

export default config;
