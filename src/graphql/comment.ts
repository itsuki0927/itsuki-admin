import type { ID, MutationRequest, SearchRequest, SearchResponse } from '@/helper/http.interface'
import type { CommentSearchRequest, CommentUpdateRequest } from '@/services/ant-design-pro/comment'
import type { API } from '@/services/ant-design-pro/typings'
import { gql } from '@apollo/client'

export type QueryCommentsResponse = {
  comments: SearchResponse<API.Comment>
}

export type QueryCommentResponse = {
  comment: API.Comment
}

export type QueryCommentsSearch = SearchRequest<CommentSearchRequest>

export type UpdateCommentStateInput = ID & Pick<API.Comment, 'state'>

export type UpdateCommentInput = ID & MutationRequest<CommentUpdateRequest>

export type UpdateCommentResponse = {
  updateComment: API.Comment
}

export const QUERY_COMMENTS = gql`
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

export const QUERY_COMMENT = gql`
  query fetchComment($id: ID!) {
    comment(id: $id) {
      nickname
      email
      website
      id
      ip
      articleTitle
      articleDescription
      content
      liking
      agent
      city
      province
      state
      fix
      expand
      parentId
      parentNickName
    }
  }
`

export const UPDATE_COMMENT = gql`
  mutation updateComment($id: ID!, $input: UpdateCommentInput!) {
    updateComment(id: $id, input: $input) {
      nickname
      email
      website
      id
      ip
      articleTitle
      articleDescription
      content
      liking
      agent
      city
      province
      state
      fix
      expand
      parentId
      parentNickName
    }
  }
`
