import { Environment, mode } from './environment'

const apiMap = {
  [Environment.Development]: 'http://localhost:5555',
  [Environment.Production]: 'https://api.fivewoods.xyz',
} as const

export const STATIC_URL = 'https://resources.fivewoods.xyz'

export const API_URL = apiMap[mode!]

export const API_VERSION = 'v1'

export const APP_TITLE = 'Blog Admin'

export const BLOG_HOST = 'itsuki.cn'

export const BLOG_ORIGIN = `https://${BLOG_HOST}`
