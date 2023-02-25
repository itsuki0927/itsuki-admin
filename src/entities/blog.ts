import { PublishState } from '@/constants/publish';
import { BaseSearchRequest, IdentifiableEntity } from '@/helper/basicType';
import { Tag } from './tag';

export type Blog = IdentifiableEntity<{
  title: string;
  description: string;
  content: string;
  author: string;
  cover: string;
  state: number;
  keywords: string;
  publish: PublishState;
  reading: number;
  liking: number;
  commenting: number;
  path: string;
  cardStyle: string;
  tags: Tag[];
}>;

/**
 * 文章创建、更新封装类
 */
export type BlogActionRequest = {
  title: string;
  description: string;
  keywords: string;
  content: string;
  publish: PublishState;
  tagIds: number[];
  cover: string;
  path: string;
};

/**
 * 文章搜索请求类
 */
export type SearchBlogInput = BaseSearchRequest<{
  name?: string;
  publish?: PublishState;
  tagId?: number;
}>;

/**
 * 文章详情响应类
 */
export type BlogDetailResponse = Blog & {
  tagIds: number[];
  keywords: string[];
};

/**
 * 文章Patch请求类
 */
export type BlogPatchRequest = {
  ids: number[];
  state: PublishState;
};

/**
 * 文章Patch请求类
 */
export type BlogMetaPatchRequest = {
  meta: string;
  value?: number;
};

type BlogSummary = {
  publish: number;
  value: number;
  title: string;
  state: string;
};

export type BlogSummaryResponse = {
  total: BlogSummary;
  draft: BlogSummary;
  recycle: BlogSummary;
  published: BlogSummary;
};
