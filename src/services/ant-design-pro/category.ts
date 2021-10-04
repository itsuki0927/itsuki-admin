// @ts-ignore
/* eslint-disable */
import { SearchResponse } from '@/helper/http.interface'
import { request } from 'umi'
import { API } from './typings'

/**
 * 分类创建、更新请求类
 */
export type CategoryActionRequest = Omit<API.Category, 'createAt' | 'updateAt' | 'id'>

/** 创建分类 POST /category */
export const createCategory = (data: CategoryActionRequest) =>
  request<API.Category>('/category', { method: 'POST', data })

/** 查询分类 GET /category */
export const queryCategoryList = () =>
  request<SearchResponse<API.Category>>('/category', { method: 'GET' })

/** 删除分类 DELETE /category/:id */
export const removeCategory = (id: number) =>
  request<number>(`/category/${id}`, { method: 'DELETE' })

/** 更新分类 PUT /category/:id */
export const updateCategory = (id: number, data: CategoryActionRequest) =>
  request<API.Category>(`/category/${id}`, { method: 'PUT', data })
