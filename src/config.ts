import { Environment, mode } from './environment';

const apiMap = {
  [Environment.Development]: 'http://localhost:5555',
  [Environment.Production]: 'https://api.itsuki.cn',
} as const;

export const STATIC_URL = 'https://static.itsuki.cn';

export const API_URL = apiMap[mode as keyof typeof apiMap];

export const API_VERSION = 'v1';

export const APP_TITLE = 'Blog Admin';

export const BLOG_HOST = 'itsuki.cn';

export const BLOG_ORIGIN = `https://${BLOG_HOST}`;
