# Vue Reactivity

Vue Reactivity comes with some caveats that are not always obvious. While the docs recommend using `ref` API over `reactive`, this can result in more boilerplate (negative) but is less prone to developer error (positive). For example, when attempting to destructure `reactive` objects, as this will lose the reactivity even thought it may not have been obvious previously that it _was_ reactive. This is most notable when working with `vue-query`, the queries **and** key factories _must_ be provided with reactive references in order to respond to updates! There are several approaches to dealing with these limitations, listed below.

## Definitions

- `usePagination` - returns `reactive` object
- `refDebounced` - returns `ref` object

## Separate Query Args

This approach emphasizes using `ref` API for individual query args, resulting in more reactive safety but extra query management.

- **Pros:**
  - More type safety _concerning_ reactivity for non-reactive values
- **Cons:**
  - Complicates query key management
    - Particularly when `reactive` and `ref` values are mixed

```ts
const quoteQueryKeys = {
  allPaginated: (pagination: PaginationInput, search?: Ref<string>) => ["quote", args],
} as const;

const useQuotesQuery = (pagination: PaginationInput, search?: Ref<string> }) => useQuery({
  queryFn: () => api.get<PaginatedResult<Quote>>("/quote", {
    params: { ...pagination, search }
  }).then((r) => r.data),
  queryKey: quoteQueryKeys.allPaginated(pagination, search),
});

const { pagination } = usePagination({ size: 10 });
const quoteSearch = ref("");
const quoteSearchDebounced = refDebounced(quoteSearch, 500, { maxWait: 1000 });

const quotesQuery = useQuotesQuery(pagination, quoteSearchDebounced);
```

## Reactive Query Args

This approach emphasizes using `reactive` API for grouped query args, resulting in easier query management but less reactive safety.

- **Pros:**
  - Drastically simplifies query key management
- **Cons:**
  - Cannot be destructured without losing reactivity (not implicitly obvious)!
  - Adds boilerplate when passing arguments to query composable
  - Less type-safety _concerning_ reactivity
    - Would always be an issue for any `reactive` objects utilized (ie. `pagination` in examples)...

```ts
const quoteQueryKeys = {
  allPaginated: (args: PaginationInput & { search?: string }) => ["quote", args],
} as const;

const useQuotesQuery = (args: PaginationInput & { search?: string }) => useQuery({
  queryFn: () => api.get<PaginatedResult<Quote>>("/quote", { params: args }).then((r) => r.data),
  queryKey: quoteQueryKeys.allPaginated(args),
});

const { pagination } = usePagination({ size: 10 });
const quoteSearch = ref("");
const quoteSearchDebounced = refDebounced(quoteSearch, 500, { maxWait: 1000 });

const quoteQueryArgs = reactive({
  ...toRefs(pagination),
  search: quoteSearchDebounced,
});

const quotesQuery = useQuotesQuery(quoteQueryArgs);
```