// @ts-ignore
/* eslint-disable */
import { API } from './typings'

/**
 * 标签创建、更新请求类
 */
export type TagActionRequest = Omit<API.Tag, 'createAt' | 'updateAt' | 'id'>
