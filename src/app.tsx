import type { Settings as LayoutSettings } from '@ant-design/pro-layout'
import { PageLoading } from '@ant-design/pro-layout'
import type { RequestConfig, RunTimeLayoutConfig } from 'umi'
import { history, Link } from 'umi'
import RightContent from '@/components/RightContent'
import Footer from '@/components/Footer'
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api'
import { BookOutlined, LinkOutlined } from '@ant-design/icons'
import { notification } from 'antd'
import { getToken } from './utils/auth'

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
  currentUser?: API.CurrentUser
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>
}> {
  const fetchUserInfo = async () => {
    try {
      const data = await queryCurrentUser()
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
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history
      // 如果没有登录，重定向到 login
      console.log('initialState:', initialState?.currentUser)
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

const authHeaderInterceptor = (url: string, options: any) => {
  const token = getToken()
  if (token) {
    const authHeader = { Authorization: `Bearer ${token}` }
    return {
      url: `${url}`,
      options: { ...options, interceptors: true, headers: authHeader },
    }
  }
  return { url, options }
}

const responseInterceptors = (response: Response) => {
  return response
    .clone()
    .json()
    .then((data) => {
      // 请求成功直接返回 data
      if (data.status === 200) {
        console.group('---response---')
        console.log('response origin data:', data)
        console.groupEnd()
        return data.data
      }
      // 失败返回response 进行errorHandler
      return response
    })
}

export const request: RequestConfig = {
  errorHandler: (error: { response: Response; data: any; request: any; message: any }) => {
    console.group('---errorHandler---')
    console.dir(error)
    console.groupEnd()
    // 异常处理
    notification.error({
      message: `请求错误 ${error.response.status}: ${error.data.message}`,
      description: `错误地址: ${error.response.url}`,
    })
    // 然后把data数据返回
    return error.response.json()
  },
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [responseInterceptors],
}
