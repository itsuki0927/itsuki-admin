import type { SearchResponse } from '@/helper/http.interface'
import type { ArticleSearchRequest } from '@/services/ant-design-pro/article'
import type { API } from '@/services/ant-design-pro/typings'
import { gql } from '@apollo/client'

export type QueryArticleResponse = {
  articles: SearchResponse<API.Article>
}

export type QueryArticleSearch = {
  search: ArticleSearchRequest
}

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

export const QUERY_ARTICLE = gql`
  query findArticles($search: ArticleSearchRequest) {
    articles(search: $search) {
      data {
        id
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
        origin
        open
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
