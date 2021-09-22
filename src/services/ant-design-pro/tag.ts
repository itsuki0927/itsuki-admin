// @ts-ignore
/* eslint-disable */
import { request } from 'umi'

/** 创建标签 POST /tag */
export const createTag = (data: API.Article) => request<API.Tag>('/tag', { method: 'POST', data })

/** 查询标签 GET /tag */
export const queryTagList = (params: { name?: string; [key: string]: any }) =>
  request<API.Tag>('/tag', { method: 'GET', params })

/** 删除标签 DELETE /tag/:id */
export const removeTag = (id: number) => request<API.Tag>(`/tag/${id}`, { method: 'DELETE' })

/** 更新标签 PUT /tag/:id */
export const updateTag = ({ id, ...data }: API.Tag) =>
  request<API.Tag>(`/tag/${id}`, { method: 'PUT', data })
