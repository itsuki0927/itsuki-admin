import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Modal } from 'antd';
import { useState } from 'react';
import { getUEditorCache } from '@/components/common/UniversalEditor';
import {
  QueryArticleResponse,
  QueryArticleSearch,
  QueryArticlesResponse,
  QueryArticleSummaryResponse,
  UpdateArticleInput,
  ARTICLE_SUMMARY,
  DETELTE_ARTICLE,
  QUERY_ARTICLE,
  QUERY_ARTICLES,
  UPDATE_ARTICLE,
  UPDATE_ARTICLE_BANNER,
  UPDATE_ARTICLE_STATE,
  SYNC_ARTICLE_COMMENT_COUNT,
} from '@/graphql/article';
import type { ID } from '@/helper/http.interface';
import type {
  ArticleBannerPatchRequest,
  ArticleDetailResponse,
  ArticlePatchRequest,
} from '@/entities/article';

export const useArticles = () =>
  useLazyQuery<QueryArticlesResponse, QueryArticleSearch>(QUERY_ARTICLES);

export const useUpdateArticleState = () =>
  useMutation<number, ArticlePatchRequest>(UPDATE_ARTICLE_STATE);

export const useUpdateArticleBanner = () =>
  useMutation<number, ArticleBannerPatchRequest>(UPDATE_ARTICLE_BANNER);

export const useUpdateArticle = () =>
  useMutation<void, UpdateArticleInput>(UPDATE_ARTICLE);

export const useDeleteArticle = () => useMutation<number, ID>(DETELTE_ARTICLE);

const handleDiffContent =
  (articleCacheID: string) =>
    (result: ArticleDetailResponse): Promise<ArticleDetailResponse> =>
      new Promise(resolve => {
        const localContent = getUEditorCache(articleCacheID);
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

export const useArticle = (id: number) => {
  const cacheID = window.location.pathname;
  const diffContent = handleDiffContent(cacheID);

  const [article, setArticle] = useState<ArticleDetailResponse | undefined>();
  const { loading, updateQuery } = useQuery<QueryArticleResponse, ID>(QUERY_ARTICLE, {
    variables: {
      id,
    },
    onCompleted: ({ article: articleProp }) => {
      diffContent(articleProp).then(result => {
        setArticle({
          ...result,
          keywords: result.keywords.split('、') as any,
          tagIds: result.tags.map(v => v.id),
        });
      });
    },
  });

  return { article, cacheID, loading, updateQuery } as const;
};

export const useSyncArticleCommentCount = () =>
  useMutation<number, { ids: number[] }>(SYNC_ARTICLE_COMMENT_COUNT);

export const useArticleSummary = () =>
  useLazyQuery<QueryArticleSummaryResponse, void>(ARTICLE_SUMMARY);
