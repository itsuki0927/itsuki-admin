import { IdentifiableEntity } from '@/helper/basicType';

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

export type LoginType = 'github' | 'google';
