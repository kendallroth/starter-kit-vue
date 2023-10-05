import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import I18NextVue from "i18next-vue";
import yaml from "js-yaml";

import { supportedLanguages } from "#utilities/localization";

import type { App } from "vue";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .init({
    backend: {
      // Localization files are stored as YAML (must convert to JSON)
      // Source: https://github.com/i18next/react-i18next/issues/1167#issuecomment-684824857
      loadPath: "/locales/{{lng}}/{{ns}}.yaml",
      parse(data: string) {
        return yaml.load(data);
      },
    },
    // debug: true,
    // defaultNS: "common",
    fallbackLng: "en-US",
    interpolation: {
      // Vue already handles XSS safety
      escapeValue: false,
    },
    load: "currentOnly",
    ns: ["common", "views"],
    // Prevent returning null from `t` functions (reduces errors with assigning where null is unexpected)
    returnNull: false,
    supportedLngs: supportedLanguages.map((l) => l.code),
  });

export const i18nPlugin = {
  install: (app: App) => {
    app.use(I18NextVue, { i18next: i18n });
  },
};
