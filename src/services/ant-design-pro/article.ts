// @ts-ignore
/* eslint-disable */
import { ArticleBanner } from '@/constants/article/banner'
import { ArticleOrigin } from '@/constants/article/origin'
import { ArticleOpen } from '@/constants/article/public'
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
  origin: ArticleOrigin
  open: ArticleOpen
  categoryId: number
  tagIds: number[]
  cover?: string
  password?: string
}

/**
 * 文章搜索请求类
 */
export type ArticleSearchRequest = BaseSearchRequest<{
  name?: string
  publish?: PublishState
  open?: ArticleOpen
  origin?: ArticleOrigin
  banner?: ArticleBanner
  tag?: number
  category?: number
}>

/**
 * 文章详情响应类
 */
export type ArticleDetailResponse = API.Article & {
  tagIds: number[]
  keywords: string[]
  categoryId: number
}

/**
 * 文章Patch请求类
 */
export type ArticlePatchRequest = {
  ids: number[]
  state: PublishState
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
  status: string
}

export type ArticleSummaryResponse = {
  total: ArticleSummary
  draft: ArticleSummary
  recycle: ArticleSummary
  published: ArticleSummary
}

/** 创建文章 POST /article */
export const createArticle = (data: ArticleActionRequest) =>
  request<API.Article>('/article', { method: 'POST', data })

/** 查询文章列表 GET /article */
export const queryArticleList = (params?: ArticleSearchRequest) =>
  request<BaseSearchRequest<API.Article>>('/article', { method: 'GET', params })

/** 查询文章下的评论列表 GET /article/:articleId/comments */
export const queryArticleCommentList = (articleId: string | number) =>
  request<API.Comment[]>(`/article/${articleId}/comments`, { method: 'GET' })

/** 查询文章 GET /article/:id */
export const queryArticleById = (id: number) =>
  request<ArticleDetailResponse>(`/article/${id}`, { method: 'GET' })

/** 查询文章统计 GET /article/summary */
export const queryArticleSummary = () =>
  request<ArticleSummaryResponse>('/article/summary', { method: 'GET' })

/** 更新文章 PUT /article/:id */
export const updateArticle = (id: number, data: ArticleActionRequest) =>
  request<API.Article>(`/article/${id}`, { method: 'PUT', data })

/** 删除文章 DELETE /article/:id */
export const deleteArticle = (id: number) => request<number>(`/article/${id}`, { method: 'DELETE' })

/** 更新文章 PATCH /article */
export const patchArticle = (data: ArticlePatchRequest) =>
  request<number>('/article', { method: 'PATCH', data })

/** 更新文章 PATCH /article/:id */
export const patchArticleMeta = (id: number, data: ArticleMetaPatchRequest) =>
  request<number>(`/article/${id}`, { method: 'PATCH', data })
