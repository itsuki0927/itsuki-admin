// @ts-ignore
/* eslint-disable */
import { request } from 'umi'
import { API } from './typings'

/** 创建文章 POST /article */
export const createArticle = (data: API.Article) =>
  request<API.CurrentAdmin>('/article', { method: 'POST', data })
