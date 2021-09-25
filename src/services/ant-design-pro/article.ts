// @ts-ignore
/* eslint-disable */
import { ArticleOrigin } from '@/constants/article/origin'
import { ArticleOpen } from '@/constants/article/public'
import { PublishState } from '@/constants/publish'
import { BaseSearchRequest } from '@/helper/http.interface'
import { request } from 'umi'
import { API } from './typings'

/**
 * 文章搜索请求类
 */
export type ArticleSearchRequest = BaseSearchRequest<{
  name?: string
  publish?: PublishState
  open?: ArticleOpen
  origin?: ArticleOrigin
  tag?: number
  category?: number
}>

/**
 * 文章详情响应类
 */
export type ArticleDetailResponse = API.Article & {
  tagIds?: number[]
  categoryIds?: number[]
}

/**
 * 文章Patch请求类
 */
export type ArticlePatchRequest = {
  ids: number[]
  state: PublishState
}

/** 创建文章 POST /article */
export const createArticle = (data: API.Article) =>
  request<API.Article>('/article', { method: 'POST', data })

/** 查询文章列表 GET /article */
export const queryArticleList = (params?: any) =>
  request<BaseSearchRequest<API.Article>>('/article', { method: 'GET', params })

/** 查询文章 GET /article/:id */
export const queryArticleById = (id: number) =>
  request<ArticleDetailResponse>(`/article/${id}`, { method: 'GET' })

/** 更新文章 PUT /article/:id */
export const updateArticle = (id: number, data: any) =>
  request<API.Article>(`/article/${id}`, { method: 'PUT', data })

/** 删除文章 DELETE /article/:id */
export const deleteArticle = (id: number) => request<number>(`/article/${id}`, { method: 'DELETE' })

/** 更新文章 PATCH /article */
export const patchArticle = (data: ArticlePatchRequest) =>
  request<number>('/article', { method: 'PATCH', data })
