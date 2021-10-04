// @ts-ignore
/* eslint-disable */
import { SearchResponse } from '@/helper/http.interface'
import { request } from 'umi'
import { API } from './typings'

/**
 * 标签创建、更新请求类
 */
export type TagActionRequest = Omit<API.Tag, 'createAt' | 'updateAt' | 'id'>

/** 创建标签 POST /tag */
export const createTag = (data: TagActionRequest) =>
  request<API.Tag>('/tag', { method: 'POST', data })

/** 查询标签 GET /tag */
export const queryTagList = (params?: { name?: string; [key: string]: any }) =>
  request<SearchResponse<API.Tag>>('/tag', { method: 'GET', params })

/** 删除标签 DELETE /tag/:id */
export const removeTag = (id: number) => request<number>(`/tag/${id}`, { method: 'DELETE' })

/** 更新标签 PUT /tag/:id */
export const updateTag = (id: number, data: TagActionRequest) =>
  request<API.Tag>(`/tag/${id}`, { method: 'PUT', data })
