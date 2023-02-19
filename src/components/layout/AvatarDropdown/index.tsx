import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderDropdown from '../HeaderDropdown';
import { useAdmin } from '@/context';
import styles from './index.module.less';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  const history = useNavigate();
  const { logout } = useAdmin();

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        logout?.();
        return;
      }
      history(`/settings?tab=${key}`);
    },
    [history, logout]
  );

  const menuHeaderDropdown = (
    <Menu
      className={styles.menu}
      selectedKeys={[]}
      onClick={onMenuClick}
      items={[
        {
          key: 'logout',
          label: '退出登录',
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          style={{ backgroundColor: '#87d068' }}
          icon={<UserOutlined />}
          size='small'
        />
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
