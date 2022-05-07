import { DEFAULT_CURRENT, MAX_PAGE_SIZE } from '@/constants/common'
import type {
  CreateTagInput,
  CreateTagResponse,
  QueryTagResponse,
  TagSearchRequest,
  UpdateTagInput,
  UpdateTagResponse,
} from '@/graphql/tag'
import { CREATE_TAG, DELETE_TAG, QUERY_TAG, UPDATE_TAG } from '@/graphql/tag'
import type { ID } from '@/helper/http.interface'
import { useMutation, useQuery } from '@apollo/client'

export const useTag = (search: TagSearchRequest['search']) => {
  return useQuery<QueryTagResponse, TagSearchRequest>(QUERY_TAG, {
    variables: {
      search,
    },
  })
}

export const useAllTag = () => {
  return useQuery<QueryTagResponse, TagSearchRequest>(QUERY_TAG, {
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
