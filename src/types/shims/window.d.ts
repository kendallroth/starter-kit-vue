declare global {
  interface Window {
    /**
     * Global promise that resolves only when MSW has finished initializing (dev-only!)
     *
     * This enables a workaround to dev race conditions between requests being initiated before
     *   MSW has initialized and is ready to receive them.
     */
    mswReady?: Promise<ServiceWorkerRegistration | undefined>;
  }
}

// NOTE: Apparently need to export something for TS to pick up this module...
export {};
