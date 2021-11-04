import { Settings as LayoutSettings } from '@ant-design/pro-layout'

const Settings: LayoutSettings & {
  pwa?: boolean
  logo?: string
} = {
  title: 'Blog Admin',
  pwa: false,
  logo: 'https://resources.fivewoods.xyz/logo.png',
  iconfontUrl: '',
  navTheme: 'light',
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  splitMenus: false,
  fixedHeader: true,
  fixSiderbar: true,
  footerRender: false,
}

export default Settings
