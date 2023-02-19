import { gql } from '@apollo/client';

export type AuthLoginResponse = {
  login: string;
};

export type AuthLoginRequest = {
  password: string;
};

export const LOGIN = gql`
  mutation login($password: String!) {
    login(password: $password)
  }
`;
