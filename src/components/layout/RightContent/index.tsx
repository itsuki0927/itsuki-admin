import { Space } from 'antd';
import { Link } from 'react-router-dom';
import HeaderSearch from '../HeaderSearch';
import Avatar from './AvatarDropdown';
import styles from './index.module.less';

const renderItem = (title: string, url: string) => ({
  value: title,
  label: <Link to={url}>{title}</Link>,
});

const options = [
  {
    label: <Link to='/dashboard'>Dashboard</Link>,
    value: 'Dashboard',
  },
  {
    label: '文章管理',
    options: [
      renderItem('文章列表', '/blog/list'),
      renderItem('新撰文章', '/blog/create'),
    ],
  },
  {
    label: <Link to='/comment'>评论管理</Link>,
    value: '评论管理',
  },
  {
    label: <Link to='/tag'>标签管理</Link>,
    value: '标签管理',
  },
  {
    label: <Link to='/category'>分类管理</Link>,
    value: '分类管理',
  },
  {
    label: <Link to='/settings'>系统设置</Link>,
    value: '系统设置',
  },
];

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  return (
    <Space className={styles.right}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder='站内搜索'
        options={options}
      />
      <Avatar menu />
    </Space>
  );
};

export default GlobalHeaderRight;
