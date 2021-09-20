// @ts-ignore
/* eslint-disable */
import { request } from 'umi'

/** 获取当前的用户 GET /api/currentUser */
export const currentAdmin = (options?: { [key: string]: any }) =>
  request<API.CurrentAdmin>('/admin/current-user', {
    method: 'GET',
    ...(options || {}),
  })

/** 登录接口 POST /api/login/account */
export const login = (body: API.LoginParams, options?: { [key: string]: any }) =>
  request<API.LoginResponse>('/admin/login', {
    method: 'POST',
    data: body,
    ...(options || {}),
  })
