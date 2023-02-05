import { Auth, CustomParameters, GoogleAuthProvider } from 'firebase/auth';
import { useCallback } from 'react';
import useSignInWithPopup, { SignInWithPopupHook } from './useSignInWithPopup';

const useSignInWithGoogle = (auth: Auth): SignInWithPopupHook => {
  const createGoogleAuthProvider = useCallback(
    (scopes?: string[], customOAuthParameters?: CustomParameters) => {
      const provider = new GoogleAuthProvider();
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
  return useSignInWithPopup(auth, createGoogleAuthProvider);
};

export default useSignInWithGoogle;
