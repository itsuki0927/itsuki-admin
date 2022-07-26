import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { Admin } from './entities/admin';
import { useCurrentAdmin } from './hooks/admin';

interface AdminContextType {
  currentAdmin?: Admin;
  setCurrentAdmin?: (admin: Admin) => void;
  fetchCurrentAdmin?: () => Promise<Admin | undefined>;
}
export const AdminContext = createContext<AdminContextType>({});

export const AdminProvider = ({ children }: PropsWithChildren) => {
  const [currentAdmin, setCurrentAdmin] = useState<Admin | undefined>(undefined);
  const fetch = useCurrentAdmin();

  const fetchCurrentAdmin = async () => {
    if (currentAdmin) {
      return currentAdmin;
    }
    const { data } = await fetch();
    setCurrentAdmin(data?.currentAdmin);
    console.log('data', data);
    return data?.currentAdmin;
  };

  const value = useMemo<AdminContextType>(() => {
    return {
      currentAdmin,
      setCurrentAdmin,
      fetchCurrentAdmin,
    };
  }, [currentAdmin, fetchCurrentAdmin]);

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('');
  }
  return context;
};
