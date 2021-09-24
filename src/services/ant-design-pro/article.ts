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

/** 创建文章 POST /article */
export const createArticle = (data: API.Article) =>
  request<API.Article>('/article', { method: 'POST', data })

/** 查询文章 GET /article */
export const queryArticleList = (params?: any) =>
  request<BaseSearchRequest<API.Article>>('/article', { method: 'GET', params })
