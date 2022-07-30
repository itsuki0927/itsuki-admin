import classNames from 'classnames';
import logoImg from '@/assets/logo.png';
import { useUI } from '@/ui';
import styles from './index.module.less';

const Logo = () => {
  const { collapsed } = useUI();
  return (
    <div className={classNames(styles.logo, collapsed && styles.collapsed)}>
      <img className={styles.img} src={logoImg} alt='logo' />
      {!collapsed && <h1 className={classNames(styles.title)}>Itsuki Admin</h1>}
    </div>
  );
};

export default Logo;
