// @ts-ignore
/* eslint-disable */
import { request } from 'umi'
import { API } from './typings'
export type LoginResponse = {
  state: string
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
}

export type AdminUpdatePasswordRequest = {
  password: string
  newPassword: string
  confirm: string
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

/** 保存信息 PUT /admin/save */
export const saveAdminInfo = (data: AdminSaveRequest) =>
  request<API.Admin>('/admin', {
    method: 'PUT',
    data,
  })

/** 更新密码 PUT /admin/password */
export const updateAdminPassword = (data: AdminUpdatePasswordRequest) =>
  request<API.Admin>('/admin/password', {
    method: 'PUT',
    data,
  })
