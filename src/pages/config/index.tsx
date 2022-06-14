import { Container } from '@/components/common'
import { AccountSettings, PasswordSettings, BlackListSettings } from '@/components/settings'
import useQuery from '@/hooks/useQuery'
import { LockOutlined, SecurityScanOutlined, UserOutlined } from '@ant-design/icons'
import ProCard from '@ant-design/pro-card'
import { GridContent } from '@ant-design/pro-layout'
import { Menu } from 'antd'
import { useEffect, useState } from 'react'
import { history } from 'umi'
import styles from './style.less'

const { Item } = Menu

type ConfigStateKeys = 'blacklist' | 'account' | 'password'

const menuMap = {
  blacklist: {
    text: '黑名单设置',
    icon: <SecurityScanOutlined />,
  },
  account: {
    text: '个人设置',
    icon: <UserOutlined />,
  },
  password: {
    text: '密码设置',
    icon: <LockOutlined />,
  },
}

const SystemSettings = () => {
  const [selectKey, setSelectKey] = useState<ConfigStateKeys>('blacklist')
  const { tab = 'blacklist' } = useQuery<{ tab: string }>()

  useEffect(() => {
    if (tab !== selectKey) {
      setSelectKey(tab as ConfigStateKeys)
    }
  }, [selectKey, tab])

  const getMenu = () =>
    Object.keys(menuMap).map((item) => <Item key={item}>{menuMap[item].text}</Item>)

  const getRightTitle = () => (
    <div>
      <span style={{ marginRight: 14 }}>{menuMap[selectKey].icon}</span>
      {menuMap[selectKey].text}
    </div>
  )

  const renderChildren = () => {
    switch (selectKey) {
      case 'blacklist':
        return <BlackListSettings />
      case 'account':
        return <AccountSettings />
      case 'password':
        return <PasswordSettings />
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
