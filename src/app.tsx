import RightContent from '@/components/RightContent'
import { BookOutlined, LinkOutlined } from '@ant-design/icons'
import type { Settings as LayoutSettings } from '@ant-design/pro-layout'
import { PageLoading } from '@ant-design/pro-layout'
import type { RunTimeLayoutConfig } from 'umi'
import { history, Link } from 'umi'
import { queryCurrentAdmin } from './services/ant-design-pro/admin'
import type API from './services/ant-design-pro/typings'
import requestConfig from './utils/request'

const isDev = process.env.NODE_ENV === 'development'
const loginPath = '/user/login'

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
}

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>
  currentUser?: API.CurrentAdmin
  fetchUserInfo?: () => Promise<API.CurrentAdmin | undefined>
}> {
  const fetchUserInfo = async () => {
    try {
      const data = await queryCurrentAdmin()
      console.log('fetchUserInfo:', data)
      return data
    } catch (error) {
      history.push(loginPath)
    }
    return undefined
  }
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo()
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    }
  }
  return {
    fetchUserInfo,
    settings: {},
  }
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.nickname,
    },
    // footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history
      // 如果没有登录，重定向到 login
      console.log('onPageChange:', initialState?.currentUser)
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath)
      }
    },
    links: isDev
      ? [
          <Link to='/umi/plugin/openapi' target='_blank'>
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to='/~docs'>
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  }
}

export const request = requestConfig
