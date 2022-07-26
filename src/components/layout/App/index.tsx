import { Layout, Menu } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { convertRoutesToAntdMenu, RouteOptoins, routes } from '../../../routes';
import logoImg from '@/assets/logo.png';
import styles from './styles.module.less';
import RightContent from '../RightContent';
import { useFetchCurrentAdmin } from '@/hooks/admin';
import { useAdmin } from '@/context';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const menus = convertRoutesToAntdMenu(routes);
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchCurrentAdmin } = useAdmin();
  const renderRoutes = useCallback((list: RouteOptoins[]) => {
    return list
      .filter(v => !v.redirect)
      .map(route => {
        // if(route.needPermission){
        //   return false;
        // }
        if (route.redirect) return null;
        const Comp = route.component;
        if (Comp) {
          return <Route path={route.path} element={<Comp />} />;
        }
        if (route.routes) {
          return renderRoutes(route.routes);
        }
        return null;
      });
  }, []);

  useEffect(() => {
    console.log('location', location);
    if (location.pathname !== '/login') {
      fetchCurrentAdmin?.();
    }
  }, [location, fetchCurrentAdmin]);

  return (
    <Layout className={styles.app}>
      <Sider theme='light' width={250}>
        <div className={styles.logo}>
          <img className={styles.img} src={logoImg} alt='logo' />
          <h1 className={styles.title}>Itsuki Admin</h1>
        </div>
        <Menu
          items={menus}
          mode='inline'
          onSelect={({ key }) => {
            navigate(key);
          }}
        />
      </Sider>
      <Layout className='site-layout'>
        <Header className={styles.header}>
          <RightContent />
        </Header>
        <Content className='site-layout-background'>
          <Routes>{renderRoutes(routes)}</Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
