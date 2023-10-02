import { ref, type Ref } from "vue";

/** Storage key prefix to avoid collisions with other apps */
export const STORAGE_KEY_PREFIX = "sk-vue";

interface StorageStateOptions<T> {
  /** Default value (used for missing/invalid values) */
  defaultValue: T;
  /** Whether parsed value is valid or not (will use `defaultValue` if not) */
  valid?: (value: T) => boolean;
  /** Storage key prefix override */
  prefix?: string;
}

/**
 * Reactive state synced with web storage
 *
 * @param storage Storage API (`localStorage`, etc)
 * @param key     Storage key
 * @param options Storage state options
 */
export const useStorageState = <T>(
  storage: Storage,
  key: string,
  options: StorageStateOptions<T>,
): [Ref<T>, (val: T) => void] => {
  const { defaultValue, prefix, valid } = options;

  /** Prefixed storage key */
  const storageKey = `${prefix ?? STORAGE_KEY_PREFIX}-${key}`;

  const loadValue = (): T => {
    const storedValue = storage.getItem(storageKey);
    if (storedValue === null) return defaultValue;

    try {
      const parsedValue = JSON.parse(storedValue);

      if (valid && !valid(parsedValue)) {
        throw new Error(`Invalid stored value for '${storageKey}'`);
      }

      return parsedValue;
    } catch (e) {
      storage.removeItem(storageKey);
      return defaultValue;
    }
  };

  // NOTE: Type cast is necessary due to use of generics for state type
  // Source: https://github.com/vuejs/core/issues/1324#issuecomment-641150163
  const valueRef = ref<T>(loadValue()) as Ref<T>;

  const setValue = (value: T) => {
    valueRef.value = value;
    if (value === undefined) {
      storage.removeItem(storageKey);
    } else {
      storage.setItem(storageKey, JSON.stringify(value));
    }
  };

  return [valueRef, setValue];
};
