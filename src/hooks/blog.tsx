import { useLazyQuery, useMutation } from '@apollo/client';
import { Modal } from 'antd';
import { useState } from 'react';
import { getUEditorCache } from '@/components/common/UniversalEditor';
import {
  QueryBlogResponse,
  QueryBlogSearch,
  QueryBlogsResponse,
  QueryBlogSummaryResponse,
  UpdateBlogInput,
  BLOG_SUMMARY,
  DETELTE_BLOG,
  QUERY_BLOG,
  QUERY_BLOGS,
  UPDATE_BLOG,
  UPDATE_BLOG_BANNER,
  UPDATE_BLOG_STATE,
  SYNC_BLOG_COMMENT_COUNT,
  QueryBlogInput,
} from '@/graphql/blog';
import type { ID } from '@/helper/basicType';
import type {
  BlogBannerPatchRequest,
  BlogDetailResponse,
  BlogPatchRequest,
} from '@/entities/blog';

export const useBlogs = () =>
  useLazyQuery<QueryBlogsResponse, QueryBlogSearch>(QUERY_BLOGS);

export const useUpdateBlogState = () =>
  useMutation<number, BlogPatchRequest>(UPDATE_BLOG_STATE);

export const useUpdateBlogBanner = () =>
  useMutation<number, BlogBannerPatchRequest>(UPDATE_BLOG_BANNER);

export const useUpdateBlog = () => useMutation<void, UpdateBlogInput>(UPDATE_BLOG);

export const useDeleteBlog = () => useMutation<number, ID>(DETELTE_BLOG);

const handleDiffContent =
  (blogCacheID: string) =>
  (result: BlogDetailResponse): Promise<BlogDetailResponse> =>
    new Promise(resolve => {
      const localContent = getUEditorCache(blogCacheID);
      if (result && !!localContent && localContent !== result.content) {
        Modal.confirm({
          title: '本地缓存存在未保存的文章，是否要覆盖远程数据？',
          content: '如果覆盖错了，就自己刷新吧！',
          okText: '本地覆盖远程',
          cancelText: '使用远程数据',
          centered: true,
          okButtonProps: {
            danger: true,
          },
          onOk() {
            resolve({
              ...result,
              content: localContent,
            });
          },
          onCancel() {
            resolve(result);
          },
        });
      } else {
        resolve(result);
      }
    });

export const useBlog = () => {
  const cacheID = window.location.pathname;
  const diffContent = handleDiffContent(cacheID);

  const [blog, setBlog] = useState<BlogDetailResponse | undefined>();
  const [fetchBlog, { loading, updateQuery }] = useLazyQuery<
    QueryBlogResponse,
    QueryBlogInput
  >(QUERY_BLOG, {
    onCompleted: ({ blog: blogProp }) => {
      diffContent(blogProp).then(result => {
        setBlog({
          ...result,
          keywords: result.keywords.split('、') as any,
          tagIds: result.tags.map(v => v.id),
        });
      });
    },
  });

  return { fetchBlog, blog, cacheID, loading, updateQuery } as const;
};

export const useSyncBlogCommentCount = () =>
  useMutation<number, { ids: number[] }>(SYNC_BLOG_COMMENT_COUNT);

export const useBlogSummary = () =>
  useLazyQuery<QueryBlogSummaryResponse, void>(BLOG_SUMMARY);
