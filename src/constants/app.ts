/* eslint-disable prefer-destructuring */
// api url
export const API_URL = import.meta.env.VITE_API_BASE_PATH;

// api version
export const API_VERSION = import.meta.env.VITE_API_VERSION;

// api endpoint
export const API_ENDPOINT = `${API_URL}/${API_VERSION}/graphql`;

// iconfont url
export const ICONFONT_URL = '//at.alicdn.com/t/font_2836612_p216jd1hf5';

// 静态资源路径
export const STATIC_URL = import.meta.env.VITE_STATIC_URL;

// 邮箱
export const EMAIL = import.meta.env.VITE_EMAIL;

// firebase
export const FIREBASE = {
  API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
  AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGEING_SENDER_ID,
  APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
  MEASUREMENT_ID: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,

  // admin
  PRIVATE_KEY: import.meta.env.VITE_FIREBASE_PRIVATE_KEY,
  CLIENT_EMAIL: import.meta.env.VITE_FIREBASE_CLIENT_EMAIL,
};
