import { Auth, CustomParameters, GithubAuthProvider } from 'firebase/auth';
import { useCallback } from 'react';
import useSignInWithPopup, { SignInWithPopupHook } from './useSignInWithPopup';

const useSignInWithGithub = (auth: Auth): SignInWithPopupHook => {
  const createGithubAuthProvider = useCallback(
    (scopes?: string[], customOAuthParameters?: CustomParameters) => {
      const provider = new GithubAuthProvider();
      if (scopes) {
        scopes.forEach(scope => provider.addScope(scope));
      }
      if (customOAuthParameters) {
        provider.setCustomParameters(customOAuthParameters);
      }
      return provider;
    },
    []
  );

  return useSignInWithPopup(auth, createGithubAuthProvider);
};

export default useSignInWithGithub;
