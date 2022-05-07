import { DEFAULT_CURRENT, MAX_PAGE_SIZE } from '@/constants/common'
import type {
  CreateTagInput,
  CreateTagResponse,
  QueryTagResponse,
  QueryTagSearch,
  UpdateTagInput,
  UpdateTagResponse,
} from '@/graphql/tag'
import { CREATE_TAG, DELETE_TAG, QUERY_TAG, UPDATE_TAG } from '@/graphql/tag'
import type { ID } from '@/helper/http.interface'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'

export const useTag = () => {
  return useLazyQuery<QueryTagResponse, QueryTagSearch>(QUERY_TAG)
}

export const useAllTag = () => {
  return useQuery<QueryTagResponse, QueryTagSearch>(QUERY_TAG, {
    variables: {
      search: {
        current: DEFAULT_CURRENT,
        pageSize: MAX_PAGE_SIZE,
      },
    },
  })
}

export const useCreateTag = () => {
  return useMutation<CreateTagResponse, CreateTagInput>(CREATE_TAG)
}

export const useDeleteTag = () => {
  return useMutation<void, ID>(DELETE_TAG)
}

export const useUpdateTag = () => {
  return useMutation<UpdateTagResponse, UpdateTagInput>(UPDATE_TAG)
}
