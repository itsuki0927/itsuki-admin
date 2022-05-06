import { Footer, HeaderContent, RightContent, MainContent } from '@/components/layout'
import { queryCurrentAdmin } from '@/services/ant-design-pro/admin'
import type { API } from '@/services/ant-design-pro/typings'
import requestConfig from '@/utils/request'
import type { Settings as LayoutSettings } from '@ant-design/pro-layout'
import { PageLoading } from '@ant-design/pro-layout'
import { ApolloProvider } from '@apollo/client'
import type { RunTimeLayoutConfig } from 'umi'
import { history } from 'umi'
import { client } from './graphql'

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

const handlePageChange = (initialState: any) => {
  const { location } = history
  // 如果没有登录，重定向到 login
  if (!initialState?.currentUser && location.pathname !== loginPath) {
    history.push(loginPath)
  }
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    siderWidth: 180,
    collapsedButtonRender: false,
    disableContentMargin: false,
    menuHeaderRender: undefined,
    waterMarkProps: {
      content: initialState?.currentUser?.nickname,
    },
    childrenRender: (children) => (
      <ApolloProvider client={client}>
        <MainContent>{children}</MainContent>
      </ApolloProvider>
    ),
    rightContentRender: () => <RightContent />,
    headerContentRender: (props) => <HeaderContent {...props} />,
    footerRender: () => <Footer />,
    onPageChange: () => handlePageChange(initialState),
    // 自定义 403 页面
    unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  }
}

export const request = requestConfig
