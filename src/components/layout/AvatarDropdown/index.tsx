import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
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
  const { currentAdmin, logout } = useAdmin();

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

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size='small'
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!currentAdmin) {
    return loading;
  }

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
          size='small'
          className={styles.avatar}
          src={currentAdmin.avatar}
          alt='avatar'
        />
        {currentAdmin.nickname}
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
