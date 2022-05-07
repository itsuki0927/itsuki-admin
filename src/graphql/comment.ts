import type { SearchRequest, SearchResponse } from '@/helper/http.interface'
import type { CommentSearchRequest } from '@/services/ant-design-pro/comment'
import type { API } from '@/services/ant-design-pro/typings'
import { gql } from '@apollo/client'

export type QueryCommentsResponse = {
  comments: SearchResponse<API.Comment>
}

export type QueryCommentsSearch = SearchRequest<CommentSearchRequest>

export const QUERY_COMMENT = gql`
  query findComments($search: CommentSearchRequest!) {
    comments(search: $search) {
      total
      data {
        id
        nickname
        email
        website
        content
        liking
        ip
        agent
        city
        province
        status
        fix
        expand
        articleTitle
        articleDescription
        parentNickName
        parentId
        articleId
      }
    }
  }
`

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(id: $id)
  }
`
