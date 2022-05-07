// @ts-ignore
/* eslint-disable */
import { CommentState } from '@/constants/comment'
import { BaseSearchRequest, SearchResponse } from '@/helper/http.interface'
import { request } from 'umi'
import { API } from './typings'

/**
 * 文章搜索请求类
 */
export type CommentSearchRequest = BaseSearchRequest<{
  keyword?: string
  state?: number
  articleId?: number
}>

/**
 * 文章update请求类
 */
export type CommentUpdateRequest = {
  nickname: string
  email: string
  website: string
  content: string
  liking: number
  expand: string
  state: CommentState
}

/**
 * 文章patch请求类
 */
export type CommentPatchRequest = {
  ids: number[]
  state: CommentState
}

export type CommentTree = API.Comment & {
  children?: CommentTree[]
}

/** 查询评论列表 GET /comment */
export const queryCommentList = (params?: CommentSearchRequest) =>
  request<SearchResponse<API.Comment>>('/comment', { method: 'GET', params })

/** 查询评论 GET /comment/:id */
export const queryComment = (id: number | string) =>
  request<API.Comment>(`/comment/${id}`, { method: 'GET' })

/** 更新文章 PUT /comment/:id */
export const updateComment = (id: number, data: CommentUpdateRequest) =>
  request<API.Comment>(`/comment/${id}`, { method: 'PUT', data })

/** 更新文章 PATCH /comment */
export const patchComment = (data: CommentPatchRequest) =>
  request<number>('/comment', { method: 'PATCH', data })

/** 删除文章 DELETE /comment/:id */
export const removeComment = (id: number) => request<number>(`/comment/${id}`, { method: 'DELETE' })
