import type {
  QueryCommentsResponse,
  QueryCommentsSearch,
  UpdateCommentStateInput,
} from '@/graphql/comment'
import { UPDATE_COMMENT_STATE } from '@/graphql/comment'
import { DELETE_COMMENT, QUERY_COMMENT } from '@/graphql/comment'
import type { ID } from '@/helper/http.interface'
import { useLazyQuery, useMutation } from '@apollo/client'

export const useComments = () => {
  return useLazyQuery<QueryCommentsResponse, QueryCommentsSearch>(QUERY_COMMENT)
}

export const useDeleteComment = () => {
  return useMutation<void, ID>(DELETE_COMMENT)
}

export const useUpdateCommentState = () => {
  return useMutation<void, UpdateCommentStateInput>(UPDATE_COMMENT_STATE)
}
