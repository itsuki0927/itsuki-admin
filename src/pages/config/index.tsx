import { Container } from '@/components/common'
import { AccountSettings, AuthSettings, BaseSettings } from '@/components/settings'
import useQuery from '@/hooks/useQuery'
import { SecurityScanOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import ProCard from '@ant-design/pro-card'
import { GridContent } from '@ant-design/pro-layout'
import { Menu } from 'antd'
import { useEffect, useState } from 'react'
import { history } from 'umi'
import styles from './style.less'

const { Item } = Menu

type ConfigStateKeys = 'base' | 'account' | 'auth'

const menuMap = {
  base: {
    text: '黑名单设置',
    icon: <SettingOutlined />,
  },
  account: {
    text: '个人设置',
    icon: <UserOutlined />,
  },
  auth: {
    text: '密码设置',
    icon: <SecurityScanOutlined />,
  },
}

const SystemSettings = () => {
  const [selectKey, setSelectKey] = useState<ConfigStateKeys>('base')
  const { tab = 'base' } = useQuery<{ tab: string }>()

  useEffect(() => {
    if (tab !== selectKey) {
      setSelectKey(tab as ConfigStateKeys)
    }
  }, [selectKey, tab])

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
        return <BaseSettings />
      case 'account':
        return <AccountSettings />
      case 'auth':
        return <AuthSettings />
      default:
        return null
    }
  }

  return (
    <Container>
      <ProCard title='系统设置' headerBordered>
        <GridContent>
          <div className={styles.main}>
            <div className={styles.leftMenu}>
              <Menu
                selectedKeys={[selectKey]}
                onClick={({ key }) => {
                  history.replace(`${location.pathname}?tab=${key}`)
                  setSelectKey(key as ConfigStateKeys)
                }}
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
      </ProCard>
    </Container>
  )
}

export default SystemSettings
