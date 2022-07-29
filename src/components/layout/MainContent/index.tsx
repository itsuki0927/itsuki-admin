import { CaretUpOutlined } from '@ant-design/icons';
import { BackTop } from 'antd';
import type { PropsWithChildren } from 'react';
import styles from './index.less';

const MainContent: PropsWithChildren<any> = ({ children }) => {
  return (
    <>
      {children}
      <BackTop className={styles.backTop}>
        <div className={styles.trigger}>
          <CaretUpOutlined />
        </div>
      </BackTop>
    </>
  );
};

export default MainContent;
