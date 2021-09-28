// @ts-ignore
/* eslint-disable */
import { request } from 'umi'
import { API } from './typings'

/** 查询设置 GET /config */
export const querySystemConfig = () => request<API.SystemConfig>('/config', { method: 'GET' })

/** 保存设置 PUT /config */
export const saveSystemConfig = (data: API.Tag) =>
  request<API.Tag>(`/config`, { method: 'PUT', data })
