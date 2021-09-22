// @ts-ignore
/* eslint-disable */

declare namespace API {
  type Admin = {
    id: number
    username: string
    nickname: string
    avatar: string
    role: string
    description: string
    createAt: Date
  }
  type CurrentAdmin = Admin

  type LoginResponse = {
    status: string
    token: string
    expiration: string
  }

  type PageParams = {
    current?: number
    pageSize?: number
  }

  type RuleListItem = {
    key?: number
    disabled?: boolean
    href?: string
    avatar?: string
    name?: string
    owner?: string
    desc?: string
    callNo?: number
    status?: number
    updatedAt?: string
    createdAt?: string
    progress?: number
  }

  type RuleList = {
    data?: RuleListItem[]
    /** 列表的内容总数 */
    total?: number
    success?: boolean
  }

  type FakeCaptcha = {
    code?: number
    status?: string
  }

  type LoginParams = {
    username?: string
    password?: string
    autoLogin?: boolean
    type?: string
  }

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string
    /** 业务上的错误信息 */
    errorMessage?: string
    /** 业务上的请求是否成功 */
    success?: boolean
  }

  type NoticeIconList = {
    data?: NoticeIconItem[]
    /** 列表的内容总数 */
    total?: number
    success?: boolean
  }

  type NoticeIconItemType = 'notification' | 'message' | 'event'

  type NoticeIconItem = {
    id?: string
    extra?: string
    key?: string
    read?: boolean
    avatar?: string
    title?: string
    status?: string
    datetime?: string
    description?: string
    type?: NoticeIconItemType
  }

  type Article = {
    id?: number
    title?: string
    description?: string
    content?: string
    author?: string
    cover?: string
    status?: number
    createAt?: Date
    updateAt?: Date
  }

  type Tag = {
    id?: number
    name?: string
    description?: string
    path?: string
    count?: number
    sort?: number
    createAt?: Date
    updateAt?: Date
    expand?: string
  }
}
