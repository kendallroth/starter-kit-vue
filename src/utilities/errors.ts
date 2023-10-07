import axios from "axios";

import type { AxiosError } from "axios";

// Default error that will be used when no error message is found
const DEFAULT_ERROR_MESSAGE = "An unknown error occurred";

/**
 * Assert that an unknown error derives from 'Error' (changes type after function call)
 *
 * Use to ensure that 'unknown' errors from try/catch blocks are actually derived from 'Error' class,
 *   to prevent invalidly accessing standard error properties (ie. 'message'). Invalid errors will
 *   be thrown as-is, and caught by the NestJS unhandled exception handler.
 *
 * @param  error - Unknown error shape
 * @throws Original error if not derived from 'Error' class
 *
 * @example
 * try {
 *   ...
 * } catch (e: unknown) {
 *   assertError(e);  // Will assert that 'e' is an 'Error' or throw otherwise
 *   console.log(e.message);
 * }
 */
// NOTE: Strange type syntax is necessary to fix 'Assertions require every name in the call...' error
//         when using "standard" TS assertion typing (ie. on right side of function vs left).
// Source: https://github.com/microsoft/TypeScript/pull/33622#issuecomment-575301357
export const assertError: (error: unknown) => asserts error is Error = (error: unknown) => {
  if (!(error instanceof Error)) throw error;
};

/**
 * Type guard utility to detect Axios errors with type safety
 *
 * @param   error - Unkown error shape
 * @returns Whether error is an Axios error (with type safety)
 *
 * @source https://github.com/axios/axios/issues/3612#issuecomment-1198490390
 * @example
 * if (isAxiosError(error)) {
 *   const status = error.response?.statusCode;  // TS will acknowledge that 'error' is an 'AxiosError'
 * }
 */
export const isAxiosError = <ResponseType>(error: unknown): error is AxiosError<ResponseType> => {
  return axios.isAxiosError(error);
};

/**
 * Get an error message from an error
 *
 * @param   error          - Error object/string
 * @param   defaultMessage - Default error message
 */
export const getError = (error: unknown, defaultMessage?: string): string => {
  if (!error) return "";

  const errorMessage = getErrorMessage(error);
  if (!errorMessage) {
    return defaultMessage ?? DEFAULT_ERROR_MESSAGE;
  }

  return errorMessage;
};

/**
 * Get an error `code` string from an error (for UI error checks)
 *
 * @param   error - Error object/string
 */
export const getErrorCode = (error: unknown): string | null => {
  if (!isAxiosError(error)) return null;

  // API errors are returned in an interesting nested format
  if (error?.response?.data) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (error.response.data as any).code;
  }

  return null;
};

/**
 * Get an error message from an error
 *
 * @param   error - Error object/string
 */
export const getErrorMessage = (error: unknown): string | null => {
  if (!error) return null;

  // Errors are often provided as an object, but the message 'key' may vary
  if (typeof error === "object") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorObject = error as any;
    // API errors are returned in an interesting nested format
    let message = errorObject.message;
    if (errorObject?.response?.data) {
      message = errorObject.response.data?.message;
      return Array.isArray(message) ? message[0] : message;
    }

    // 'message' key should always be checked last (most common, likely not set manually)
    if (message) return message;
  }
  // A bare error code may be provided instead of an error object
  else if (typeof error === "string") {
    return error;
  }

  return null;
};

/**
 * Determine whether an error includes a specific error code string
 *
 * @param   error           - Error object/string
 * @param   targetErrorCode - Target error code
 */
export const hasError = (error: unknown, targetErrorCode: string): boolean => {
  if (!error) return false;

  const errorCode = getErrorCode(error);
  if (!errorCode) return false;

  return errorCode === targetErrorCode;
};

/**
 * Determine whether an error includes a specific error status code number
 *
 * @param   error           - Error object/string
 * @param   targetErrorStatus - Target error status code
 */
export const hasStatusCode = (error: unknown, targetErrorStatus: number): boolean => {
  if (!isAxiosError(error)) return false;

  return error.response?.status === targetErrorStatus;
};
