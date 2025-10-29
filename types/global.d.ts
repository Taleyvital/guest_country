declare global {
  interface Window {
    storage?: {
      get: (key: string, sync?: boolean) => Promise<{ value: string } | null>;
      set: (key: string, value: string, sync?: boolean) => Promise<void>;
    };
  }
}

export {};

