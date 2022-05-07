import type { QueryCommentsResponse, QueryCommentsSearch } from '@/graphql/comment'
import { QUERY_COMMENT } from '@/graphql/comment'
import { useLazyQuery } from '@apollo/client'

export const useComments = () => {
  return useLazyQuery<QueryCommentsResponse, QueryCommentsSearch>(QUERY_COMMENT)
}
