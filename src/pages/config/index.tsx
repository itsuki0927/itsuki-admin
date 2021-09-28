import { SettingOutlined, UserOutlined } from '@ant-design/icons'
import { GridContent } from '@ant-design/pro-layout'
import { Menu } from 'antd'
import { createRef, useEffect, useState } from 'react'
import AccountView from './components/Account'
import BaseView from './components/Base'
import styles from './style.less'

const { Item } = Menu

type ConfigStateKeys = 'base' | 'account'

const menuMap = {
  base: {
    text: '基本设置',
    icon: <SettingOutlined />,
  },
  account: {
    text: '个人设置',
    icon: <UserOutlined />,
  },
}

const SystemConfig = () => {
  let main = createRef<HTMLDivElement | null>()
  const [mode, setMode] = useState<'inline' | 'horizontal'>('inline')
  const [selectKey, setSelectKey] = useState<ConfigStateKeys>('base')

  const resize = () => {
    if (!main.current) {
      return
    }
    requestAnimationFrame(() => {
      if (!main.current) {
        return
      }
      // eslint-disable-next-line @typescript-eslint/no-shadow
      let mode: 'inline' | 'horizontal' = 'inline'
      const { offsetWidth } = main.current
      if (main.current.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal'
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal'
      }
      setMode(mode)
    })
  }

  useEffect(() => {
    resize()
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  const getMenu = () =>
    Object.keys(menuMap).map((item) => <Item key={item}>{menuMap[item].text}</Item>)

  const getRightTitle = () => (
    <div>
      <span style={{ marginRight: 15 }}>{menuMap[selectKey].icon}</span>
      {menuMap[selectKey].text}
    </div>
  )

  const renderChildren = () => {
    switch (selectKey) {
      case 'base':
        return <BaseView />
      case 'account':
        return <AccountView />
      default:
        return null
    }
  }

  return (
    <GridContent>
      <div
        className={styles.main}
        ref={(ref) => {
          if (ref) {
            main = ref as any
          }
        }}
      >
        <div className={styles.leftMenu}>
          <Menu
            mode={mode}
            selectedKeys={[selectKey]}
            onClick={({ key }) => setSelectKey(key as ConfigStateKeys)}
          >
            {getMenu()}
          </Menu>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>{getRightTitle()}</div>
          {renderChildren()}
        </div>
      </div>
    </GridContent>
  )
}

export default SystemConfig
