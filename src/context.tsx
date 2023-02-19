import { message } from 'antd';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useLogin } from './hooks/login';
import { removeToken, setToken } from './utils/auth';

export interface Member {
  email: string | null;
  nickname: string | null;
  avatar: string | null;
  uid: string;
  token: string;
  provider: string;
  isLogin: boolean;
}

interface AdminContextType {
  logout?: () => void;
  login?: (password: string) => Promise<{ login?: string } | undefined | null>;
}

export const AdminContext = createContext<AdminContextType>({});

export const AdminProvider = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loginHandler] = useLogin();
  const [searchParams] = useSearchParams();

  const logout = useCallback(async () => {
    const { pathname } = location;
    if (window.location.pathname !== '/user/login') {
      navigate(`/login?redirect=${pathname}`, { replace: true });
      removeToken();
    }
  }, [navigate, location]);

  const login = useCallback(
    async (password: string) => {
      try {
        if (!password) {
          message.error('请输入密码');
          return;
        }
        const { data } = await loginHandler({
          variables: {
            password,
          },
        });
        console.log('res:', data);
        message.success('登陆成功');
        setToken(data?.login ?? '');
        navigate(searchParams.get('redirect') || '/');
        return data;
      } catch (error) {
        console.log('error:', error);
        // 如果失败去设置用户错误信息
        message.error('登陆失败, 请重试! ');
      }
    },
    [loginHandler, navigate, searchParams]
  );

  const value = useMemo<AdminContextType>(() => {
    return {
      login,
      logout,
    };
  }, [login, logout]);

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('');
  }
  return context;
};
