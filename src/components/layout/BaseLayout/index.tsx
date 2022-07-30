import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { PropsWithChildren } from 'react';
import styles from './styles.module.less';
import RightContent from '../RightContent';
import { convertRoutesToAntdMenu, constantRoutes } from '@/routes';
import Logo from '../Logo';
import Hamburger from '../Hamburger';
import { useUI } from '@/ui';

const { Header, Sider, Content } = Layout;
const menus = convertRoutesToAntdMenu(constantRoutes);

const BaseLayout = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const { collapsed, toggleCollapse } = useUI();
  console.log('collapsed', collapsed);

  return (
    <Layout className={styles.app}>
      <Sider theme='light' width={250} collapsed={collapsed}>
        <Logo />
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
          <Hamburger collapsed={collapsed} onCollapse={toggleCollapse} />
          <RightContent />
        </Header>
        <Content className='site-layout-background'>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
