export interface AppConfig {
  /** Git commit SHA (only defined from pipelines) */
  commitSha?: string;
  /** Whether app is running in development */
  development: boolean;
  /** Whether app is running in production */
  production: boolean;
}
