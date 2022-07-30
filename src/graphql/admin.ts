import { gql } from '@apollo/client';
import type { MutationRequest } from '@/helper/basicType';
import type {
  Admin,
  AdminSaveRequest,
  AdminUpdatePasswordRequest,
  LoginParams,
  LoginResponse,
} from '@/entities/admin';

export type AdminLoginResponse = {
  login: LoginResponse;
};

export type AdminLoginInput = MutationRequest<LoginParams>;

export type UpdateAdminInput = MutationRequest<AdminSaveRequest>;

export type UpdateAdminPasswordInput = MutationRequest<AdminUpdatePasswordRequest>;

export type QueryCurrentAdminResponse = {
  currentAdmin: Admin;
};

export const LOGIN = gql`
  mutation login($input: LoginRequest!) {
    login(input: $input) {
      token
      expiration
      state
    }
  }
`;

export const UPDATE_ADMIN = gql`
  mutation updateAdmin($input: UpdateAdminInput!) {
    updateAdmin(input: $input) {
      avatar
      description
      nickname
    }
  }
`;

export const UPDATE_ADMIN_PASSWORD = gql`
  mutation updateAdminPassword($input: UpdateAdminPasswordInput!) {
    updateAdminPassword(input: $input) {
      nickname
    }
  }
`;

export const QUERY_CURRENT_ADMIN = gql`
  query currentAdmin {
    currentAdmin {
      nickname
      role
      avatar
      username
      description
    }
  }
`;
