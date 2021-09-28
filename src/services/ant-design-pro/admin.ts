// @ts-ignore
/* eslint-disable */
import { request } from 'umi'
import { API } from './typings'

export type AdminSaveRequest = {
  /**
   * 头像
   */
  avatar: string
  /**
   * 昵称
   */
  nickname: string
  /**
   * 描述
   */
  description: string
  /**
   * 密码
   */
  password: string
  /**
   * 新密码
   */
  newPassword: string
  /**
   * 确认密码
   */
  confirm: string
}

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

export const saveAdminInfo = (data: AdminSaveRequest) =>
  request<API.Admin>('/admin/save', {
    method: 'POST',
    data,
  })
