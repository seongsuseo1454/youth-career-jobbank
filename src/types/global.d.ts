// src/types/global.d.ts
export {};

declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void;
      isInitialized?: () => boolean;
      Auth: {
        authorize: (opts: { redirectUri: string; scope?: string }) => Promise<void> | void;
      };
      API: {
        request: (opts: { url: string; data?: Record<string, any> }) => Promise<any>;
      };
    };
  }
}