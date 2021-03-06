// @ts-ignore
/* eslint-disable */
import { ArticleBanner } from '@/constants/article/banner'
import { ArticleOrigin } from '@/constants/article/origin'
import { PinnedState } from '@/constants/pinned'
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

  type Article = IdentifiableEntity<{
    title: string
    description: string
    content: string
    author: string
    cover: string
    state: number
    keywords: string
    publish: PublishState
    banner: ArticleBanner
    reading: number
    liking: number
    commenting: number
    tags: API.Tag[]
  }>

  type Tag = IdentifiableEntity<{
    name: string
    description: string
    path: string
    count: number
    sort: number
    expand?: string
  }>

  type Blacklist = IdentifiableEntity<{
    ip: string[]
    email: string[]
    keyword: string[]
  }>

  type Comment = IdentifiableEntity<{
    nickname: string
    email: string
    loginType: string
    avatar: string
    content: string
    liking: number
    ip: string
    city: string
    province: string
    agent: string
    state: number
    fix: number
    expand: string
    parentId: number
    articleId: number
    articleTitle: string
    articleDescription: string
    parentNickName: string
  }>
}
