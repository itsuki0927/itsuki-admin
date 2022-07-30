import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import styles from './index.module.less';

interface HamburgerProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

const Hamburger = ({ collapsed, onCollapse }: HamburgerProps) => (
  <div
    onClick={() => onCollapse?.(!collapsed)}
    className={styles.hamburger}
    role='button'
    tabIndex={0}
  >
    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
  </div>
);

export default Hamburger;
