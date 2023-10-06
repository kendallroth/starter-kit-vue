import { type AppConfig } from "./types";

const production = import.meta.env.PROD;

export const appConfig: AppConfig = {
  commitSha: import.meta.env.VITE_GIT_SHA?.slice(0, 8),
  development: !production,
  links: {
    api: "http://localhost:3001",
  },
  production,
};
