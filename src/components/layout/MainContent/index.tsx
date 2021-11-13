import { CaretUpOutlined } from '@ant-design/icons'
import { BackTop } from 'antd'
import type { FC } from 'react'
import styles from './index.less'

const MainContent: FC = ({ children }) => {
  return (
    <>
      {children}
      <BackTop className={styles.backTop}>
        <div className={styles.trigger}>
          <CaretUpOutlined />
        </div>
      </BackTop>
    </>
  )
}

export default MainContent
