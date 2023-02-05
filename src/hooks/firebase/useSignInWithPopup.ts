import {
  Auth,
  AuthError,
  AuthProvider,
  CustomParameters,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import { useCallback, useState } from 'react';

export type AuthActionHook<M> = [
  M,
  UserCredential | undefined,
  boolean,
  AuthError | undefined
];

export type SignInWithPopupHook = AuthActionHook<
  (
    scopes?: string[],
    customOAuthParameters?: CustomParameters
  ) => Promise<UserCredential | undefined>
>;

const useSignInWithPopup = (
  auth: Auth,
  createProvider: (
    scopes?: string[],
    customOAuthParameters?: CustomParameters
  ) => AuthProvider
): SignInWithPopupHook => {
  const [error, setError] = useState<AuthError>();
  const [loggedInUser, setLoggedInUser] = useState<UserCredential>();
  const [loading, setLoading] = useState(false);

  const doSignInWithPopup = useCallback(
    async (scopes?: string[], customOAuthParameters?: CustomParameters) => {
      setLoading(true);
      setError(undefined);

      try {
        const provider = createProvider(scopes, customOAuthParameters);
        const user = await signInWithPopup(auth, provider);
        setLoggedInUser(user);

        return user;
      } catch (err) {
        setError(err as AuthError);
      } finally {
        setLoading(false);
      }
    },
    [auth, createProvider]
  );

  return [doSignInWithPopup, loggedInUser, loading, error];
};

export default useSignInWithPopup;
