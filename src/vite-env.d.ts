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
  VITE_API_URL: string;
  VITE_STATIC_URL: string;
  VITE_API_VERSION: string;
  VITE_BLOG_TITLE: string;
  VITE_BLOG_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
