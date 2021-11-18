// @ts-ignore
/* eslint-disable */
import { SearchResponse } from '@/helper/http.interface'
import { request } from 'umi'
import { API } from './typings'

/**
 * 分类创建、更新请求类
 */
export type SnippetCategoryActionRequest = Omit<API.SnippetCategory, 'createAt' | 'updateAt' | 'id'>

/** 创建分类 POST /snippet-category */
export const createSnippetCategory = (data: SnippetCategoryActionRequest) =>
  request<API.SnippetCategory>('/snippet-category', { method: 'POST', data })

/** 查询分类 GET /snippet-category */
export const querySnippetCategoryList = () =>
  request<SearchResponse<API.SnippetCategory>>('/snippet-category', { method: 'GET' })

/** 删除分类 DELETE /snippet-category/:id */
export const removeSnippetCategory = (id: number) =>
  request<number>(`/snippet-category/${id}`, { method: 'DELETE' })

/** 更新分类 PUT /snippet-category/:id */
export const updateSnippetCategory = (id: number, data: SnippetCategoryActionRequest) =>
  request<API.SnippetCategory>(`/snippet-category/${id}`, { method: 'PUT', data })
