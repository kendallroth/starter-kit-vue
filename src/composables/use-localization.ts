import { useTranslation } from "i18next-vue";

type TranslationOptions = Parameters<typeof useTranslation>[1];

/** Utility for `useTranslation("common")` */
export const useCommonTranslations = (options?: TranslationOptions) => {
  return useTranslation("common", options).t;
};

/** Utility for `useTranslation("views")` */
export const useViewsTranslations = (options?: TranslationOptions) => {
  return useTranslation("views", options).t;
};

export const useAllTranslations = () => {
  const commonT = useCommonTranslations();
  const viewsT = useViewsTranslations();
  const { i18next } = useTranslation();

  return {
    common: commonT,
    i18n: i18next,
    views: viewsT,
  };
};
