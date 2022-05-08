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
    open: ArticleOpen
    publish: PublishState
    origin: ArticleOrigin
    banner: ArticleBanner
    pinned: PinnedState
    reading: number
    liking: number
    commenting: number
    tags: API.Tag[]
    category: API.Category
  }>

  type Tag = IdentifiableEntity<{
    name: string
    description: string
    path: string
    count: number
    sort: number
    expand?: string
  }>

  type Category = IdentifiableEntity<{
    name: string
    description: string
    path: string
    count: number
    sort: number
    parentId: number
    expand?: string
  }>

  type SnippetCategory = IdentifiableEntity<{
    name: string
    description: string
    path: string
    count: number
    sort: number
    parentId: number
    expand?: string
  }>

  type SystemSettings = IdentifiableEntity<{
    liking: number
    title: string
    subtitle: string
    email: string
    keywords: string
    description: string
    domain: string
    record: string
    keywordsList: string[]
    ipBlackList?: string[]
    emailBlackList?: string[]
    keywordBlackList?: string[]
  }>

  type Comment = IdentifiableEntity<{
    nickname: string
    email: string
    website: string
    content: string
    liking: number
    ip: string
    city: string
    province: string
    agent: string
    state: number
    fix: string
    expand: string
    parentId: number
    articleId: number
    articleTitle: string
    articleDescription: string
    parentNickName: string
  }>

  type Snippet = IdentifiableEntity<{
    name: string
    description: string
    state: number
    ranks: number
    code: string
    skill: string
    example: string
    author: string
    website: string
    avatar: string
    email: string
    pinned: PinnedState
    categories: SnippetCategory[]
  }>
}
