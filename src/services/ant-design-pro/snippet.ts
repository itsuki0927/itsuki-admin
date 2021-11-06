// @ts-ignore
/* eslint-disable */
import { SearchResponse } from '@/helper/http.interface'
import { request } from 'umi'
import { API } from './typings'

/**
 * 片段创建、更新请求类
 */
export type SnippetActionRequest = {
  name: string
  description: string
  status: number
  ranks: number
  code: string
  skill: string
  example: string
}

/** 创建片段 POST /snippet */
export const createSnippet = (data: SnippetActionRequest) =>
  request<number>(`/snippet`, { method: 'POST', data })

/** 更新片段 PUT /snippet/:id */
export const updateSnippet = (id: number | string, data: SnippetActionRequest) =>
  request<number>(`/snippet/${id}`, { method: 'PUT', data })

/** 获取片段 GET /snippet */
export const querySnippetList = () =>
  request<SearchResponse<API.Snippet>>(`/snippet`, { method: 'GET' })

/** 获取片段 GET /snippet/:id */
export const querySnippetById = (id: number | string) =>
  request<API.Snippet>(`/snippet/${id}`, { method: 'GET' })

/** 上传片段 DELETE /snippet/:id */
export const deleteSnippet = (id: number | string) =>
  request<number>(`/snippet/${id}`, { method: 'DELETE' })
