import {
  ADMIN_COMMENT,
  CreateAdminCommentInput,
  CreateAdminCommentResponse,
  QueryCommentResponse,
  QueryCommentsResponse,
  QueryCommentsSearch,
  UpdateCommentInput,
  UpdateCommentResponse,
  UpdateCommentStateInput,
} from '@/graphql/comment'
import { UPDATE_COMMENT } from '@/graphql/comment'
import {
  DELETE_COMMENT,
  QUERY_COMMENT,
  QUERY_COMMENTS,
  UPDATE_COMMENT_STATE,
} from '@/graphql/comment'
import type { ID } from '@/helper/http.interface'
import { useLazyQuery, useMutation } from '@apollo/client'

export const useComments = () => {
  return useLazyQuery<QueryCommentsResponse, QueryCommentsSearch>(QUERY_COMMENTS)
}

export const useComment = () => {
  return useLazyQuery<QueryCommentResponse, ID>(QUERY_COMMENT)
}

export const useUpdateComment = () => {
  return useMutation<UpdateCommentResponse, UpdateCommentInput>(UPDATE_COMMENT)
}

export const useDeleteComment = () => {
  return useMutation<void, ID>(DELETE_COMMENT)
}

export const useUpdateCommentState = () => {
  return useMutation<void, UpdateCommentStateInput>(UPDATE_COMMENT_STATE)
}

export const useCreateAdminComment = () => {
  return useMutation<CreateAdminCommentResponse, CreateAdminCommentInput>(ADMIN_COMMENT)
}
