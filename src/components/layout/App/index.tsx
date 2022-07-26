import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useCallback, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { convertRoutesToAntdMenu, RouteOptoins, routes } from '../../../routes';
import logoImg from '@/assets/logo.png';
import styles from './styles.module.less';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const menus = convertRoutesToAntdMenu(routes);
  const navigate = useNavigate();
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

  return (
    <Layout className={styles.app}>
      <Sider theme='light' width={250}>
        <div className={styles.logo}>
          <img className={styles.img} src={logoImg} />
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
        <Header className='site-layout-background' style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content className='site-layout-background'>
          <Routes>{renderRoutes(routes)}</Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
