// @ts-ignore
/* eslint-disable */
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
  /**
   * 标题
   */
  title: string

  /**
   * 描述
   */
  description: string

  /**
   * 关键字
   */
  keywords: string

  /**
   * 内容
   */
  content: string

  /**
   * 封面
   */
  cover?: string

  /**
   * 分类id
   */
  categoryIds?: number[]

  /**
   * 标签id
   */
  tagIds?: number[]

  /**
   * 文章密码
   */
  password?: string

  /**
   * 发布状态: 0 -> 草稿, 1 -> 已发布, 2 -> 回收站
   */
  publish: PublishState

  /**
   * 文章来源: 0 -> 原创, 1 -> 转载, 2 -> 混合
   */
  origin: ArticleOrigin

  /**
   * 公开类型: 0 -> 需要密码, 1 -> 公开, 2 -> 私密
   */
  open: ArticleOpen
}

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
export const createArticle = (data: ArticleActionRequest) =>
  request<API.Article>('/article', { method: 'POST', data })

/** 查询文章列表 GET /article */
export const queryArticleList = (params?: any) =>
  request<BaseSearchRequest<API.Article>>('/article', { method: 'GET', params })

/** 查询文章 GET /article/:id */
export const queryArticleById = (id: number) =>
  request<ArticleDetailResponse>(`/article/${id}`, { method: 'GET' })

/** 更新文章 PUT /article/:id */
export const updateArticle = ({ id, ...data }: ArticleActionRequest) =>
  request<API.Article>(`/article/${id}`, { method: 'PUT', data })

/** 删除文章 DELETE /article/:id */
export const deleteArticle = (id: number) => request<number>(`/article/${id}`, { method: 'DELETE' })

/** 更新文章 PATCH /article */
export const patchArticle = (data: ArticlePatchRequest) =>
  request<number>('/article', { method: 'PATCH', data })
