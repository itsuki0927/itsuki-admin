import React, { useCallback } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { RouteOptions, constantRoutes } from '@/routes';
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
  const renderRoutes = useCallback((list: RouteOptions[]) => {
    return list
      .map(
        ({
          redirect,
          layout = true,
          routes,
          component: Comp,
          needPermission,
          path,
        }): any => {
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

  return <Routes>{renderRoutes(constantRoutes)}</Routes>;
};

export default App;
