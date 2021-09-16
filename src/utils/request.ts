import { notification } from 'antd'
import { getToken } from './auth'
import type { RequestConfig } from 'umi'

const authHeaderInterceptor = (url: string, options: any) => {
  const token = getToken()
  if (token) {
    const authHeader = { Authorization: `Bearer ${token}` }
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
      console.log(data)
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

const errorHandler = (error: { response: Response; data: any; request: any; message: any }) => {
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
}

const request: RequestConfig = {
  prefix: `${BASE_PATH}/api/${VERSION}`,
  timeout: 10000,
  errorHandler,
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [responseInterceptors],
}

export default request
