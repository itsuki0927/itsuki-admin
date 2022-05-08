import type { AdminLoginInput, AdminLoginResponse, UpdateAdminInput } from '@/graphql/admin'
import { UPDATE_ADMIN } from '@/graphql/admin'
import { LOGIN } from '@/graphql/admin'
import { useMutation } from '@apollo/client'

export const useLogin = () => {
  return useMutation<AdminLoginResponse, AdminLoginInput>(LOGIN)
}

export const useUpdateAdmin = () => {
  return useMutation<void, UpdateAdminInput>(UPDATE_ADMIN)
}
