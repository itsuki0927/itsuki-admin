import { message } from 'antd';
import { User } from 'firebase/auth';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { LoginType } from './entities/admin';
import useAuthState, { Member } from './hooks/firebase/useAuthState';
import useSignInWithGithub from './hooks/firebase/useSignInWithGithub';
import useSignInWithGoogle from './hooks/firebase/useSignInWithGoogle';
import useSignOut from './hooks/firebase/useSignOut';
import { auth } from './libs/firebase';
import { removeToken, setToken } from './utils/auth';

interface AdminContextType {
  currentAdmin?: Member | undefined | null;
  logout?: () => void;
  login?: (type: LoginType) => Promise<Member | undefined>;
}

export const AdminContext = createContext<AdminContextType>({});

export const formatUser = async (user: User | null): Promise<Member | null> => {
  if (!user) return null;
  const { providerId } = user.providerData?.[0] ?? '';
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

export const AdminProvider = ({ children }: PropsWithChildren) => {
  // const [currentAdmin, setCurrentAdmin] = useState<Admin | undefined>(undefined);
  const [currentAdmin] = useAuthState(auth);
  const [signInWithGithub] = useSignInWithGithub(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signOut] = useSignOut(auth);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const logout = useCallback(async () => {
    const { pathname } = location;
    if (window.location.pathname !== '/user/login') {
      navigate(`/login?redirect=${pathname}`, { replace: true });
      signOut();
      removeToken();
    }
  }, [navigate, location, signOut]);

  const login = useCallback(
    async (type: LoginType) => {
      try {
        let data;
        if (type === 'github') {
          data = await signInWithGithub();
        } else {
          data = await signInWithGoogle();
        }
        const user = await formatUser(data?.user ?? null);
        console.log('user:', user);
        if (user?.isLogin) {
          message.success('登陆成功');
          setToken(user.token);
          navigate(searchParams.get('redirect') || '/');
          return user;
        }
      } catch (error) {
        console.log('error:', error);
        // 如果失败去设置用户错误信息
        message.error('登陆失败, 请重试! ');
      }
    },
    [navigate, searchParams, signInWithGithub, signInWithGoogle]
  );

  const value = useMemo<AdminContextType>(() => {
    return {
      currentAdmin,
      login,
      logout,
    };
  }, [currentAdmin, login, logout]);

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('');
  }
  return context;
};
