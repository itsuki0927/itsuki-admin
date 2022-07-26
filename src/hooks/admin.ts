import { useLazyQuery, useMutation } from '@apollo/client';
import {
  AdminLoginInput,
  AdminLoginResponse,
  QueryCurrentAdminResponse,
  QUERY_CURRENT_ADMIN,
  UpdateAdminInput,
  UpdateAdminPasswordInput,
  UPDATE_ADMIN_PASSWORD,
  UPDATE_ADMIN,
  LOGIN,
} from '@/graphql/admin';

export const useLogin = () => {
  const [login] = useMutation<AdminLoginResponse, AdminLoginInput>(LOGIN);
  return login;
};

export const useUpdateAdmin = () => {
  const [updateAdmin] = useMutation<void, UpdateAdminInput>(UPDATE_ADMIN);
  return updateAdmin;
};

export const useUpdateAdminPassword = () => {
  const [updateAdminPassword] = useMutation<void, UpdateAdminPasswordInput>(
    UPDATE_ADMIN_PASSWORD
  );
  return updateAdminPassword;
};

export const useFetchCurrentAdmin = () => {
  const [fetchCurrentAdmin] = useLazyQuery<QueryCurrentAdminResponse, void>(
    QUERY_CURRENT_ADMIN
  );
  return fetchCurrentAdmin;
};
