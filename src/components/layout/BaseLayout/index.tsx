import { Layout } from 'antd';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.less';
import Logo from '../Logo';
import AvatarDropdown from '../AvatarDropdown';

const { Header, Content } = Layout;

const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout className={styles.app}>
      <Header className={styles.header}>
        <div className={styles.leftContent}>
          <Logo />
          <nav className={styles.menu}>
            <Link to='/blog/list'>
              <li>Blog</li>
            </Link>
            <Link to='/comment'>
              <li>Comment</li>
            </Link>
            <Link to='/tag'>
              <li>Tag</li>
            </Link>
            <Link to='/settings'>
              <li>Settings</li>
            </Link>
          </nav>
        </div>
        <AvatarDropdown />
      </Header>
      <Content className='site-layout-background'>{children}</Content>
    </Layout>
  );
};

export default BaseLayout;
