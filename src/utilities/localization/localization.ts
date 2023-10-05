import { appConfig } from "#config/app";

/**
 * App language options
 *
 * NOTE: Some langauges may not be fully supported (beta/testing)!
 */
export enum AppLanguage {
  /** English (United States) */
  EN_US = "en-US",
  /** Spanish (Spain) */
  ES_ES = "es-ES",
}

export interface LanguageConfig {
  beta?: boolean;
  code: AppLanguage;
  label: string;
}

export const allLanguages: LanguageConfig[] = [
  { code: AppLanguage.EN_US, label: "English" },
  { beta: true, code: AppLanguage.ES_ES, label: "Español" },
];

/** All supported languages (does not include beta languages in prod!) */
export const supportedLanguages: LanguageConfig[] = allLanguages.filter((l) =>
  appConfig.development ? true : !l.beta,
);
