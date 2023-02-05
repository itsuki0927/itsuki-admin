/// <reference types="vite/client" />
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_STATIC_URL: string;
  readonly VITE_API_VERSION: string;
  readonly VITE_BLOG_TITLE: string;
  readonly VITE_BLOG_HOST: string;
  readonly EMAIL: string;
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_MESSAGEING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;

  readonly VITE_FIREBASE_PRIVATE_KEY: string;
  readonly VITE_FIREBASE_CLIENT_EMAIL: string;

  readonly VITE_API_BASE_PATH: string;
  readonly VITE_API_VERSION: string;
  readonly VITE_WEB_URL: string;
  readonly VITE_STATIC_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
