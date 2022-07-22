/* eslint-disable */
import { CommentState } from '@/constants/comment';
import { BaseSearchRequest } from '@/helper/http.interface';
import { API } from './typings';

/**
 * 文章搜索请求类
 */
export type CommentSearchRequest = BaseSearchRequest<{
  keyword?: string;
  state?: number;
  articleId?: number;
}>;

/**
 * 文章update请求类
 */
export type CommentUpdateRequest = {
  nickname: string;
  email: string;
  content: string;
  liking: number;
  expand: string;
  state: CommentState;
};

/**
 * 文章patch请求类
 */
export type CommentPatchRequest = {
  id: number;
  state: CommentState;
};

export type CommentTree = API.Comment & {
  children?: CommentTree[];
};
