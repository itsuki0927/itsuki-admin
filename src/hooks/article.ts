import type { QueryArticleResponse, QueryArticleSearch } from '@/graphql/article'
import { QUERY_ARTICLE, UPDATE_ARTICLE_BANNER, UPDATE_ARTICLE_STATE } from '@/graphql/article'
import type {
  ArticleBannerPatchRequest,
  ArticlePatchRequest,
} from '@/services/ant-design-pro/article'
import { useMutation, useQuery } from '@apollo/client'

export const useArticles = (search: QueryArticleSearch['search']) => {
  return useQuery<QueryArticleResponse, QueryArticleSearch>(QUERY_ARTICLE, {
    variables: {
      search,
    },
  })
}

export const useUpdateArticleState = () =>
  useMutation<number, ArticlePatchRequest>(UPDATE_ARTICLE_STATE)

export const useUpdateArticleBanner = () =>
  useMutation<number, ArticleBannerPatchRequest>(UPDATE_ARTICLE_BANNER)
