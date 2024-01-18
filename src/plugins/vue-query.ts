import { QueryClient, VueQueryPlugin, type VueQueryPluginOptions } from "@tanstack/vue-query";

import { appConfig } from "#config/app";

import type { App } from "vue";

export const vueQueryPlugin = {
  install: (app: App) => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          // Time until inactive queries (no observers registered) will be removed from cache
          cacheTime: 5 * 60 * 1000, // 5 min
          refetchOnWindowFocus: appConfig.development,
          retry: 1,
          // Time until a query transitions from fresh (read from cache) to stale (possible refetch).
          //   Refetched when new instances mount, window is refocused, or a refetch interval.
          staleTime: 1 * 60 * 1000, // 1 min
        },
      },
    });

    const options: VueQueryPluginOptions = {
      queryClient,
    };

    app.use(VueQueryPlugin, options);
  },
};
