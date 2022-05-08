import type { MutationRequest } from '@/helper/http.interface'
import type { LoginParams, LoginResponse } from '@/services/ant-design-pro/admin'
import { gql } from '@apollo/client'

export type AdminLoginResponse = {
  login: LoginResponse
}

export type AdminLoginInput = MutationRequest<LoginParams>

export const LOGIN = gql`
  mutation login($input: LoginRequest!) {
    login(input: $input) {
      token
      expiration
      state
    }
  }
`
