import classNames from 'classnames';
import { Link } from 'react-router-dom';
import logoImg from '@/assets/logo.png';
import styles from './index.module.less';

const Logo = () => {
  return (
    <Link to='/'>
      <div className={classNames(styles.logo)}>
        <img className={styles.img} src={logoImg} alt='logo' />
      </div>
    </Link>
  );
};

export default Logo;
