import { CommentState } from '@/constants/comment';
import { BaseSearchRequest, IdentifiableEntity } from '@/helper/basicType';

export type Comment = IdentifiableEntity<{
  nickname: string;
  email: string;
  loginType: string;
  avatar: string;
  content: string;
  liking: number;
  ip: string;
  city: string;
  province: string;
  agent: string;
  state: number;
  fix: number;
  expand: string;
  parentId: number;
  articleId: number;
  articleTitle: string;
  articleDescription: string;
  parentNickName: string;
}>;
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

export type CommentTree = Comment & {
  children?: CommentTree[];
};
