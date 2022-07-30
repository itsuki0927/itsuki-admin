import { message } from 'antd';
import { stringify } from 'querystring';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Admin, AdminSaveRequest, LoginParams } from './entities/admin';
import { AdminLoginResponse } from './graphql/admin';
import { useFetchCurrentAdmin, useLogin, useUpdateAdmin } from './hooks/admin';
import { removeToken, setToken } from './utils/auth';

interface AdminContextType {
  currentAdmin?: Admin;
  fetchCurrentAdmin?: () => Promise<Admin | undefined>;
  logout?: () => void;
  login?: (input: LoginParams) => Promise<AdminLoginResponse | undefined>;
  updateAdmin?: (input: AdminSaveRequest) => Promise<void>;
}
export const AdminContext = createContext<AdminContextType>({});

export const AdminProvider = ({ children }: PropsWithChildren) => {
  const [currentAdmin, setCurrentAdmin] = useState<Admin | undefined>(undefined);
  const fetch = useFetchCurrentAdmin();
  const location = useLocation();
  const navigate = useNavigate();
  const requestLogin = useLogin();
  const [searchParams] = useSearchParams();
  const updateAdminRequest = useUpdateAdmin();

  const fetchCurrentAdmin = useCallback(async () => {
    if (currentAdmin) {
      return currentAdmin;
    }
    const { data } = await fetch();
    setCurrentAdmin(data?.currentAdmin);
    return data?.currentAdmin;
  }, [currentAdmin, fetch]);

  const logout = useCallback(async () => {
    const { pathname } = location;
    setCurrentAdmin?.(undefined);
    if (window.location.pathname !== '/user/login') {
      navigate(`/login?${stringify({ redirect: pathname })}`, {
        replace: true,
      });
      removeToken();
    }
  }, [navigate, location]);

  const login = useCallback(
    async (input: LoginParams) => {
      try {
        // 登录
        const { data } = await requestLogin({
          variables: {
            input,
          },
        });
        if (data?.login.state === 'OK') {
          message.success('登陆成功');
          setToken(data.login.token);
          await fetchCurrentAdmin?.();
          navigate(searchParams.get('redirect') || '/');
          return data;
        }
      } catch (error) {
        console.log('error:', error);
        // 如果失败去设置用户错误信息
        message.error('登陆失败, 请重试! ');
      }
    },
    [fetchCurrentAdmin, navigate, requestLogin, searchParams]
  );

  const updateAdmin = useCallback(
    async (input: AdminSaveRequest) => {
      if (currentAdmin) {
        await updateAdminRequest({
          variables: {
            input,
          },
        });
        setCurrentAdmin({
          ...currentAdmin,
          ...input,
        });
      }
    },
    [updateAdminRequest, currentAdmin]
  );

  const value = useMemo<AdminContextType>(() => {
    return {
      currentAdmin,
      fetchCurrentAdmin,
      logout,
      login,
      updateAdmin,
    };
  }, [currentAdmin, fetchCurrentAdmin, login, logout, updateAdmin]);

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('');
  }
  return context;
};
