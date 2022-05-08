import type { AdminLoginInput, AdminLoginResponse } from '@/graphql/admin'
import { LOGIN } from '@/graphql/admin'
import { useMutation } from '@apollo/client'

export const useLogin = () => {
  return useMutation<AdminLoginResponse, AdminLoginInput>(LOGIN)
}
