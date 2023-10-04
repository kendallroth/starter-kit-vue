import { type YupLocalizedError } from "./types";

/** Whether an error is a `YupLocalizedError` */
export const isYupLocalizedError = (error: unknown): error is YupLocalizedError => {
  if (!error) return false;
  const possibleError = error as YupLocalizedError;
  return Boolean(possibleError.key && possibleError.path);
};

/** Provide type safety for Yup localization error */
export const typeYupLocalizedError = (input: YupLocalizedError): YupLocalizedError => input;
