import type { ID, SearchRequest, SearchResponse } from '@/helper/http.interface'
import type { CommentSearchRequest } from '@/services/ant-design-pro/comment'
import type { API } from '@/services/ant-design-pro/typings'
import { gql } from '@apollo/client'

export type QueryCommentsResponse = {
  comments: SearchResponse<API.Comment>
}

export type QueryCommentsSearch = SearchRequest<CommentSearchRequest>

export type UpdateCommentStateInput = ID & { state: number }

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
        state
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

export const UPDATE_COMMENT_STATE = gql`
  mutation updateCommentState($id: ID!, $state: Int!) {
    updateCommentState(id: $id, state: $state)
  }
`
