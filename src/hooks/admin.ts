import type {
  AdminLoginInput,
  AdminLoginResponse,
  UpdateAdminInput,
  UpdateAdminPasswordInput,
} from '@/graphql/admin'
import { UPDATE_ADMIN_PASSWORD, UPDATE_ADMIN } from '@/graphql/admin'
import { LOGIN } from '@/graphql/admin'
import { useMutation } from '@apollo/client'

export const useLogin = () => {
  const [login] = useMutation<AdminLoginResponse, AdminLoginInput>(LOGIN)
  return login
}

export const useUpdateAdmin = () => {
  const [updateAdmin] = useMutation<void, UpdateAdminInput>(UPDATE_ADMIN)
  return updateAdmin
}

export const useUpdateAdminPassword = () => {
  const [updateAdminPassword] = useMutation<void, UpdateAdminPasswordInput>(UPDATE_ADMIN_PASSWORD)
  return updateAdminPassword
}
