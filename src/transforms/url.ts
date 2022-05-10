/**
 * url转换
 */
import { BLOG_ORIGIN } from '@/config'

export const getBlogArticleUrl = (articleId: number) => `${BLOG_ORIGIN}/article/${articleId}`

export const getBlogGuestbookUrl = () => `${BLOG_ORIGIN}/guestbook`

export const getBlogTagUrl = (path: string) => `${BLOG_ORIGIN}/tag/${path}`

export const getBlogCategoryUrl = (path: string) => `${BLOG_ORIGIN}/category/${path}`
