import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { stringify } from 'querystring';
import { Avatar, Menu, Spin } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderDropdown from '../HeaderDropdown';
import { useAdmin } from '@/context';
import styles from './index.module.less';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  const history = useNavigate();
  const { currentAdmin, setCurrentAdmin } = useAdmin();
  const location = useLocation();

  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = useCallback(async () => {
    const { pathname } = location;
    // const { redirect } = query;
    const redirect = undefined;
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      history(`/user/login${stringify({ redirect: pathname })}`, {
        replace: true,
      });
    }
  }, [history, location]);

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        setCurrentAdmin?.(undefined);
        loginOut();
        return;
      }
      history(`/settings?tab=${key}`);
    },
    [history, setCurrentAdmin, loginOut]
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
        { key: 'base', label: '基本设置', icon: <SettingOutlined /> },
        {
          key: 'account',
          label: '个人设置',
          icon: <UserOutlined />,
        },
        {
          key: 'divider',
          label: <Menu.Divider />,
        },
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
        <span className={`${styles.name} anticon`}>{currentAdmin.nickname}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
