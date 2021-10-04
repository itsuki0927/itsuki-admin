// @ts-ignore
/* eslint-disable */
import { request } from 'umi'
import { API } from './typings'
export type LoginResponse = {
  status: string
  token: string
  expiration: string
}

export type LoginParams = {
  username: string
  password: string
}

export type AdminSaveRequest = {
  avatar: string
  nickname: string
  description: string
  password?: string
  newPassword?: string
  confirm?: string
}

/** 获取当前的用户 GET /admin/current-admin */
export const queryCurrentAdmin = () =>
  request<API.CurrentAdmin>('/admin/current-admin', {
    method: 'GET',
  })

/** 登录接口 POST /admin/login*/
export const login = (body: LoginParams) =>
  request<LoginResponse>('/admin/login', {
    method: 'POST',
    data: body,
  })

/** 保存信息 POST /admin/save */
export const saveAdminInfo = (data: AdminSaveRequest) =>
  request<API.Admin>('/admin/save', {
    method: 'POST',
    data,
  })
