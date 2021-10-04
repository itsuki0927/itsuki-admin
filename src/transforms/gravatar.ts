import gravatar from 'gravatar'

/**
 * 通过邮箱获取 gravatar 路径
 * @param email 邮箱
 * @returns gravatar url
 */
export const getGravatarUrl = (email: string) => gravatar.url(email, { protocol: 'https' })
