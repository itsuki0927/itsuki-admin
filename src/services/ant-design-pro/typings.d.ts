// @ts-ignore
/* eslint-disable */
import { ArticleOrigin } from '@/constants/article/origin'
import { ArticleOpen } from '@/constants/article/public'
import { PublishState } from '@/constants/publish'
import { IdentifiableEntity } from '@/helper/http.interface'

declare namespace API {
  type Admin = IdentifiableEntity<{
    username: string
    nickname: string
    avatar: string
    role: string
    description: string
  }>
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

  type Article = IdentifiableEntity<{
    title?: string
    description?: string
    content?: string
    author?: string
    cover?: string
    status?: number
    keywords?: string
    open?: ArticleOpen
    publish?: PublishState
    origin?: ArticleOrigin
    reading?: number
    liking?: number
    commenting?: number
    tags?: API.Tag[]
    categories?: API.Category[]
  }>

  type Tag = IdentifiableEntity<{
    name?: string
    description?: string
    path?: string
    count?: number
    sort?: number
    expand?: string
  }>

  type Category = IdentifiableEntity<{
    name?: string
    description?: string
    path?: string
    count?: number
    sort?: number
    expand?: string
    parentId?: number
  }>

  type SystemConfig = IdentifiableEntity<{
    liking?: number
    title?: string
    subtitle?: string
    email?: string
    keywords?: string
    description?: string
    domain?: string
    record?: string
    ipBlackList?: string
    emailBlackList?: string
    keywordBlackList?: string
  }>

  type Comment = IdentifiableEntity<{
    /**
     * 昵称
     */
    nickname: string

    /**
     * 邮箱
     */
    email: string

    /**
     * 网址
     */
    website: string

    /**
     * 内容
     */
    content: string

    /**
     * 喜欢数
     */
    liking: number

    /**
     * ip
     */
    ip: string

    /**
     * 省份
     */
    city: string

    /**
     * 城市
     */
    province: string

    /**
     * 设备
     */
    agent: string

    /**
     * 状态
     */
    status: number

    /**
     * 是否置顶
     * 0 -> 不置顶, 1 -> 置顶
     */
    fix: string

    /**
     * 扩展
     */
    expand: string

    /**
     * 父id
     */
    parentId: number

    /**
     * 文章id
     */
    articleId: number

    /**
     * 文章标题
     */
    articleTitle: string

    /**
     * 文章描述
     */
    articleDescription: string
  }>
}
