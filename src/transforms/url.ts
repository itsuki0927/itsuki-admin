/**
 * url转换
 */
import { BLOG_ORIGIN } from '@/config';

export const getBlogArticleUrl = (articlePath: string) =>
  `${BLOG_ORIGIN}/blog/${articlePath}`;

export const getBlogGuestbookUrl = () => `${BLOG_ORIGIN}/guestbook`;

export const getBlogTagUrl = (path: string) => `${BLOG_ORIGIN}/tag/${path}`;

export const getBlogCategoryUrl = (path: string) => `${BLOG_ORIGIN}/category/${path}`;
