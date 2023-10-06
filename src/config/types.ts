export interface AppConfig {
  /** Git commit SHA (only defined from pipelines) */
  commitSha?: string;
  /** Whether app is running in development */
  development: boolean;
  links: {
    api: string;
  };
  /** Whether app is running in production */
  production: boolean;
}
