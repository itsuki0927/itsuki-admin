import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { PropsWithChildren } from 'react';
import logoImg from '@/assets/logo.png';
import styles from './styles.module.less';
import RightContent from '../RightContent';
import { convertRoutesToAntdMenu, constantRoutes } from '@/routes';

const { Header, Sider, Content } = Layout;
const menus = convertRoutesToAntdMenu(constantRoutes);

const BaseLayout = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
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
        <Content className='site-layout-background'>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
