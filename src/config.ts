/**
 * Configure environment variable
 */

import { config } from "dotenv";
config();

export const environmentVariables = {
  apiUrl: process.env.API_URL as string,
  email: process.env.EMAIL as string,
  password: process.env.PASSWORD as string,
};

export const checkAllEnvironmentVariablesAreValid = () => {
  const variables = Object.entries(environmentVariables);
  for (let index = 0; index < variables.length; index++) {
    const [key, value] = variables[index];
    if (!value) {
      throw new Error(`${key} must be provided from .env`);
    }
  }
};
