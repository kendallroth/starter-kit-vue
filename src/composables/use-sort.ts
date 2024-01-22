import { computed, reactive } from "vue";

type SortDirection = "asc" | "desc";

interface SortInput {
  key: string | null;
  dir: SortDirection;
}

/** Sorting utilities */
export const useSort = (args: Partial<SortInput> = {}) => {
  const sort = reactive<SortInput>({
    key: args.key ?? null,
    dir: args.dir ?? "asc",
  });

  const setDir = (dir: SortDirection) => {
    sort.dir = dir;
  };

  const toggleDir = () => {
    sort.dir = sort.dir === "asc" ? "desc" : "asc";
  };

  const setKey = (key: string | null, toggleOnSame = true) => {
    if (sort.key !== key) {
      sort.key = key;
      sort.dir = "asc";
    } else if (toggleOnSame) {
      toggleDir();
    }
  };

  const clear = () => {
    setKey(null);
    setDir("asc");
  };

  const reset = () => {
    setKey(args.key ?? null);
    setDir(args.dir ?? "asc");
  };

  const apiString = computed(() => {
    if (!sort.key) return undefined;
    return `${sort.dir === "desc" ? "-" : ""}${sort.key}`;
  });

  return {
    /** Computed API sort string */
    apiString,
    setDir,
    setKey,
    toggleDir,
    sort,
    clear,
    reset,
  };
};
