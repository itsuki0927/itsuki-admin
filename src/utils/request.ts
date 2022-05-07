import { API_URL, API_VERSION } from '@/config'
import { notification } from 'antd'
import type { RequestConfig } from 'umi'
import { getToken } from './auth'

const authHeaderInterceptor = (url: string, options: any) => {
  const token = getToken()
  if (token) {
    const authHeader = { Authorization: `Bearer ${token}`, ...options.headers }
    return {
      url,
      options: { ...options, interceptors: true, headers: authHeader },
    }
  }
  return { url, options }
}

const responseInterceptors = (response: Response) =>
  response
    .clone()
    .json()
    .then((data) => {
      console.log('data:', data)
      // 请求成功直接返回 data
      if (data.state === 200) {
        console.group('---response---')
        console.log('response origin data:', data)
        console.groupEnd()
        return data.data
      }
      // 失败返回response 进行errorHandler
      return response
    })

const errorHandler = (error: { response: Response; data: any; request: any; message: any }) => {
  console.group('---errorHandler---')
  console.dir(error)
  console.groupEnd()
  if (error.response) {
    // 异常处理
    notification.error({
      message: `请求错误 ${error.response.status}: ${error.data.message}`,
      description: `错误地址: ${error.response.url}`,
    })
  }
  const message = (error?.response && error.response.json()) || error.message
  // 然后把data数据返回
  return Promise.reject(message)
}

const request: RequestConfig = {
  prefix: `${API_URL}/${API_VERSION}`,
  timeout: 10000,
  errorHandler,
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [responseInterceptors],
}

export default request
