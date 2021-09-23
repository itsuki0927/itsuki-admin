// @ts-ignore
/* eslint-disable */
import { request } from 'umi'

/** 创建分类 POST /category */
export const createCategory = (data: API.Category) =>
  request<API.Category>('/category', { method: 'POST', data })

/** 查询分类 GET /category */
export const queryCategoryList = () => request<API.Category>('/category', { method: 'GET' })

/** 删除分类 DELETE /category/:id */
export const removeCategory = (id: number) =>
  request<API.Category>(`/category/${id}`, { method: 'DELETE' })

/** 更新分类 PUT /category/:id */
export const updateCategory = ({ id, ...data }: API.Category) =>
  request<API.Category>(`/category/${id}`, { method: 'PUT', data })
