import React, { useCallback, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { RouteOptoins, routes } from '../../../routes';
import { useAdmin } from '@/context';
import { getToken } from '@/utils/auth';
import BaseLayout from '../BaseLayout';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const token = getToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  return children;
};

const App: React.FC = () => {
  const location = useLocation();
  const { fetchCurrentAdmin, currentAdmin } = useAdmin();
  const renderRoutes = useCallback((list: RouteOptoins[]) => {
    return list
      .map(
        ({ redirect, layout = true, routes, component: Comp, needPermission, path }) => {
          if (redirect) {
            return <Route path={path} element={<Navigate to={redirect} />} />;
          }
          if (Comp) {
            const dom = needPermission ? (
              <RequireAuth>
                <Comp />
              </RequireAuth>
            ) : (
              <Comp />
            );
            return (
              <Route
                path={path}
                element={layout ? <BaseLayout>{dom}</BaseLayout> : dom}
              />
            );
          }
          if (routes) {
            return renderRoutes(routes);
          }
          return null;
        }
      )
      .filter(Boolean);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/login' && !currentAdmin) {
      fetchCurrentAdmin?.();
    }
  }, [location, fetchCurrentAdmin, currentAdmin]);

  return <Routes>{renderRoutes(routes)}</Routes>;
};

export default App;
