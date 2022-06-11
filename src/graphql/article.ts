import type { ID, MutationRequest, SearchRequest, SearchResponse } from '@/helper/http.interface'
import type {
  ArticleActionRequest,
  ArticleDetailResponse,
  ArticleSearchRequest,
} from '@/services/ant-design-pro/article'
import type { API } from '@/services/ant-design-pro/typings'
import { gql } from '@apollo/client'

export type QueryArticlesResponse = {
  articles: SearchResponse<API.Article>
}

export type QueryArticleResponse = {
  articleDetail: ArticleDetailResponse
}

export type QueryArticleSearch = SearchRequest<ArticleSearchRequest>

export type UpdateArticleInput = MutationRequest<ArticleActionRequest> & ID

export const CREATE_ARTICLE = gql`
  mutation createArticle($input: CreateArticleInput!) {
    createArticle(input: $input) {
      id
    }
  }
`

export const UPDATE_ARTICLE_BANNER = gql`
  mutation updateArticleBanner($ids: [ID]!, $banner: Int!) {
    updateArticleBanner(ids: $ids, banner: $banner)
  }
`

export const UPDATE_ARTICLE_STATE = gql`
  mutation patchArticleState($ids: [ID]!, $state: Int!) {
    updateArticleState(ids: $ids, state: $state)
  }
`

export const UPDATE_ARTICLE = gql`
  mutation updateArticle($id: ID!, $input: CreateArticleInput!) {
    updateArticle(id: $id, input: $input) {
      id
    }
  }
`

export const DETELTE_ARTICLE = gql`
  mutation deleteArticle($id: ID!) {
    deleteArticle(id: $id)
  }
`

export const QUERY_ARTICLE = gql`
  query findArticleDetail($id: ID!) {
    articleDetail(id: $id) {
      id
      createAt
      updateAt
      title
      description
      content
      author
      cover
      keywords
      publish
      banner
      reading
      liking
      commenting
      path
      tags {
        name
        id
      }
    }
  }
`

export const QUERY_ARTICLES = gql`
  query findArticles($search: ArticleSearchRequest) {
    articles(search: $search) {
      data {
        id
        createAt
        updateAt
        title
        publish
        description
        path
        keywords
        cover
        commenting
        author
        liking
        reading
        banner
        tags {
          id
          name
        }
      }
      total
    }
  }
`

export const SYNC_ARTICLE_COMMENT_COUNT = gql`
  mutation syncArticleCommentCount($ids: [ID]!) {
    syncArticleCommentCount(ids: $ids)
  }
`
