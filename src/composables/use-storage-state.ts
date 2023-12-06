import { onMounted, onUnmounted, ref, type Ref } from "vue";

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

type CustomStorageEvent = Pick<StorageEvent, "storageArea" | "key" | "newValue">;

// NOTE: Custom event name causes type issue with add/remove event listeners
// Source: https://stackoverflow.com/a/68783088/4206438
const customStorageEventName = "sk-vue-storage";

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

  /** Load value from storage (uses default value if missing/invalid) */
  const loadValue = (): T => {
    const storedValue = storage.getItem(storageKey);
    return parseValue(storedValue);
  };

  /** Parse stored value (uses default value if missing/invalid) */
  const parseValue = (input: string | null): T => {
    if (input === null) return defaultValue;

    try {
      const parsedValue = JSON.parse(input);

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

  /** Set value (both state and storage) */
  const setValue = (value: T) => {
    // Skip unnecessary changes (when value remains the same)
    const oldValue = storage.getItem(storageKey);
    const newValue = value !== undefined ? JSON.stringify(value) : null;
    if (oldValue === newValue) return;

    valueRef.value = value;

    if (value === undefined) {
      storage.removeItem(storageKey);
    } else {
      storage.setItem(storageKey, JSON.stringify(value));
    }

    // Other composables using same key should be updated, as the `storage` event is only used
    //   across tabs (not within same app)!
    window.dispatchEvent(
      new CustomEvent<CustomStorageEvent>(customStorageEventName, {
        detail: {
          key: storageKey,
          newValue,
          storageArea: storage,
        },
      }),
    );
  };

  /** Handle storage updates from other tabs */
  const handleNativeStorageEvent = (e: StorageEvent) => {
    handleStorageEvent({
      key: e.key,
      newValue: e.newValue,
      storageArea: e.storageArea,
    });
  };

  /** Handle storage updates from own tab */
  const handleCustomStorageEvent = (e: CustomEvent<CustomStorageEvent>) => {
    handleStorageEvent(e.detail);
  };

  /** Propagate updates to stored values to local value */
  const handleStorageEvent = (e: CustomStorageEvent) => {
    // Ignore changes in other storage mechanisms (ie. localStorage vs sessionStorage)
    if (e.storageArea !== storage) return;
    // Ignore changes for other keys
    if (e.key !== storageKey) return;

    valueRef.value = parseValue(e.newValue);
  };

  onMounted(() => {
    window.addEventListener("storage", handleNativeStorageEvent, true);
    // @ts-expect-error: Ignore "invalid" event listner name
    window.addEventListener(customStorageEventName, handleCustomStorageEvent, true);
  });

  onUnmounted(() => {
    window.removeEventListener("storage", handleNativeStorageEvent);
    // @ts-expect-error: Ignore "invalid" event listner name
    window.removeEventListener(customStorageEventName, handleCustomStorageEvent);
  });

  return [valueRef, setValue];
};
