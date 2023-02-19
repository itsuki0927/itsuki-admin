import { useMutation } from '@apollo/client';
import { AuthLoginRequest, AuthLoginResponse, LOGIN } from '@/graphql/admin';

export const useLogin = () => useMutation<AuthLoginResponse, AuthLoginRequest>(LOGIN);
