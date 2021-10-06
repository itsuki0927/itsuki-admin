// @ts-ignore
/* eslint-disable */
import { request } from 'umi'
import { API } from './typings'

/** 查询设置 GET /config */
export const querySystemSettings = () => request<API.SystemSettings>('/config', { method: 'GET' })

/** 保存设置 PUT /config */
export const saveSystemSettings = (data: API.SystemSettings) =>
  request<API.SystemSettings>(`/config`, { method: 'PUT', data })
