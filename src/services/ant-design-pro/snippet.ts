// @ts-ignore
/* eslint-disable */
import { request } from 'umi'

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
export const createSnippet = (data: any) => request<number>(`/snippet`, { method: 'POST', data })
