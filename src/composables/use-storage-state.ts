import { ref, type Ref } from "vue";

interface StorageStateOptions<T> {
  defaultValue: T;
  /** Whether parsed value is valid or not (will use `defaultValue` if not) */
  valid?: (value: T) => boolean;
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
  const { defaultValue, valid } = options;

  const loadValue = (): T => {
    const storedValue = storage.getItem(key);
    if (storedValue === null) return defaultValue;

    try {
      const parsedValue = JSON.parse(storedValue);

      if (valid && !valid(parsedValue)) {
        throw new Error(`Invalid stored value for '${key}'`);
      }

      return parsedValue;
    } catch (e) {
      storage.removeItem(key);
      return defaultValue;
    }
  };

  // NOTE: Type cast is necessary due to use of generics for state type
  // Source: https://github.com/vuejs/core/issues/1324#issuecomment-641150163
  const valueRef = ref<T>(loadValue()) as Ref<T>;

  const setValue = (value: T) => {
    valueRef.value = value;
    if (value === undefined) {
      storage.removeItem(key);
    } else {
      storage.setItem(key, JSON.stringify(value));
    }
  };

  return [valueRef, setValue];
};
