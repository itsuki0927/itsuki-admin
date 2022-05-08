import type { MutationRequest } from '@/helper/http.interface'
import type { AdminSaveRequest, LoginParams, LoginResponse } from '@/services/ant-design-pro/admin'
import { gql } from '@apollo/client'

export type AdminLoginResponse = {
  login: LoginResponse
}

export type AdminLoginInput = MutationRequest<LoginParams>

export type UpdateAdminInput = MutationRequest<AdminSaveRequest>

export const LOGIN = gql`
  mutation login($input: LoginRequest!) {
    login(input: $input) {
      token
      expiration
      state
    }
  }
`

export const UPDATE_ADMIN = gql`
  mutation updateAdmin($input: UpdateAdminInput) {
    updateAdmin(input: $input) {
      avatar
      description
      nickname
    }
  }
`
