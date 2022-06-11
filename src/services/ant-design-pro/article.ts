// @ts-ignore
/* eslint-disable */
import { ArticleBanner } from '@/constants/article/banner'
import { PublishState } from '@/constants/publish'
import { BaseSearchRequest } from '@/helper/http.interface'
import { request } from 'umi'
import { API } from './typings'

/**
 * 文章创建、更新封装类
 */
export type ArticleActionRequest = {
  title: string
  description: string
  keywords: string
  content: string
  publish: PublishState
  categoryId: number
  tagIds: number[]
  cover?: string
}

/**
 * 文章搜索请求类
 */
export type ArticleSearchRequest = BaseSearchRequest<{
  name?: string
  publish?: PublishState
  banner?: ArticleBanner
  tagId?: number
}>

/**
 * 文章详情响应类
 */
export type ArticleDetailResponse = API.Article & {
  tagIds: number[]
  keywords: string[]
}

/**
 * 文章Patch请求类
 */
export type ArticlePatchRequest = {
  ids: number[]
  state: PublishState
}

export type ArticleBannerPatchRequest = {
  ids: number[]
  banner: ArticleBanner
}

/**
 * 文章Patch请求类
 */
export type ArticleMetaPatchRequest = {
  meta: string
  value?: number
}

type ArticleSummary = {
  publish: number
  value: number
  title: string
  state: string
}

export type ArticleSummaryResponse = {
  total: ArticleSummary
  draft: ArticleSummary
  recycle: ArticleSummary
  published: ArticleSummary
}
