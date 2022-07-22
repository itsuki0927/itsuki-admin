import { IdentifiableEntity } from '@/helper/http.interface';

export type Admin = IdentifiableEntity<{
  username: string;
  nickname: string;
  avatar: string;
  role: string;
  description: string;
}>;

export type LoginResponse = {
  state: string;
  token: string;
  expiration: string;
};

export type LoginParams = {
  username: string;
  password: string;
};

export type AdminSaveRequest = {
  avatar: string;
  nickname: string;
  description: string;
};

export type AdminUpdatePasswordRequest = {
  password: string;
  newPassword: string;
  confirm: string;
};
