/**
 * url转换
 */
import { BLOG_ORIGIN } from '@/config'

/**
 * 构建宿主页面文章url
 *
 * @param articleId 文章id
 * @returns 宿主页面文章url
 */
export const getBlogArticleUrl = (articleId: number) => `${BLOG_ORIGIN}/article/${articleId}`

/**
 * @returns 宿主页面留言板url
 */
export const getBlogGuestbookUrl = () => `${BLOG_ORIGIN}/guestbook`

/**
 * 构建宿主页面片段url
 *
 * @param snippetId 片段id
 * @returns 宿主页面片段url
 */
export const getBlogSnippetUrl = (snippetId: number) => `${BLOG_ORIGIN}/snippet/${snippetId}`
