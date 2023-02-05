import { Auth, onAuthStateChanged, User } from 'firebase/auth';
import { useEffect } from 'react';
import useLoadingValue, { LoadingHook } from '../useLoadingValue';

export interface Member {
  email: string | null;
  nickname: string | null;
  avatar: string | null;
  uid: string;
  token: string;
  provider: string;
  isLogin: boolean;
}

export type AuthStateHook = LoadingHook<Member | null, Error>;

interface AuthStateOptions {
  onUserChanged?: (user: User | null) => Promise<void>;
}

export const formatUser = async (user: User | null): Promise<Member | null> => {
  if (!user) return null;
  const { providerId } = user.providerData[0];
  const provider = providerId.replace('.com', '');
  const token = await user?.getIdToken();
  return {
    uid: user.uid,
    email: user.email ?? '',
    nickname: user.displayName || user.email || '',
    avatar: user.photoURL || '',
    provider,
    token,
    isLogin: !!user.email,
  };
};

const useAuthState = (auth: Auth, options?: AuthStateOptions): AuthStateHook => {
  const { error, loading, setError, setValue, value } = useLoadingValue<
    Member | null,
    Error
  >(() => auth.currentUser as any);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async user => {
        if (options?.onUserChanged) {
          try {
            await options.onUserChanged(user);
          } catch (e) {
            setError(e as Error);
          }
        }
        const member = await formatUser(user);
        setValue(member);
      },
      setError
    );

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return [value, loading, error];
};

export default useAuthState;
