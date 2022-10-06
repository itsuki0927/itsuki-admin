/**
 * url转换
 */
import { BLOG_ORIGIN } from '@/config';

export const getBlogBlogUrl = (blogPath: string) => `${BLOG_ORIGIN}/blog/${blogPath}`;

export const getBlogGuestbookUrl = () => `${BLOG_ORIGIN}/guestbook`;

export const getBlogTagUrl = (path: string) => `${BLOG_ORIGIN}/tag/${path}`;

export const getBlogCategoryUrl = (path: string) => `${BLOG_ORIGIN}/category/${path}`;
