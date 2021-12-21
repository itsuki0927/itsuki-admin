// @ts-ignore
/* eslint-disable */
import { PinnedState } from '@/constants/pinned'
import { PublishState } from '@/constants/publish'
import { BaseSearchRequest, SearchResponse } from '@/helper/http.interface'
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

export type SnippetSearchRequest = BaseSearchRequest<{
  keyword?: string
  status?: PublishState
}>

export type SnippetPatchRequest = {
  ids: number[]
  status: PublishState
}

export type SnippetPatchPinnedRequest = {
  ids: number[]
  pinned: PinnedState
}

export type SnippetDetailResponse = API.Snippet & {
  categoryIds: number[]
}

/** 创建片段 POST /snippet */
export const createSnippet = (data: SnippetActionRequest) =>
  request<number>(`/snippet`, { method: 'POST', data })

/** 更新片段 PUT /snippet/:id */
export const updateSnippet = (id: number | string, data: SnippetActionRequest) =>
  request<number>(`/snippet/${id}`, { method: 'PUT', data })

/** 获取片段 GET /snippet */
export const querySnippetList = (params?: SnippetSearchRequest) =>
  request<SearchResponse<API.Snippet>>(`/snippet`, { method: 'GET', params })

/** 获取片段 GET /snippet/:id */
export const querySnippetById = (id: number | string) =>
  request<SnippetDetailResponse>(`/snippet/${id}`, { method: 'GET' })

/** 上传片段 DELETE /snippet/:id */
export const deleteSnippet = (id: number | string) =>
  request<number>(`/snippet/${id}`, { method: 'DELETE' })

/** 更新片段 PATCH /snippet */
export const patchSnippet = (data: SnippetPatchRequest) =>
  request<number>('/snippet', { method: 'PATCH', data })

/** 更新片段 PATCH /snippet/pinned */
export const patchSnippetPinned = (data: SnippetPatchPinnedRequest) =>
  request<number>('/snippet/pinned', { method: 'PATCH', data })
