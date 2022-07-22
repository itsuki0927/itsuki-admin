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
