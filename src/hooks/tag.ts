import { DEFAULT_CURRENT, MAX_PAGE_SIZE } from '@/constants/common'
import type {
  CreateTagInput,
  CreateTagResponse,
  QueryTagResponse,
  QueryTagSearch,
  UpdateTagInput,
  UpdateTagResponse,
} from '@/graphql/tag'
import { CREATE_TAG, DELETE_TAG, QUERY_TAG, SYNC_TAG_COUNT, UPDATE_TAG } from '@/graphql/tag'
import type { ID } from '@/helper/http.interface'
import { useLazyQuery, useMutation } from '@apollo/client'

export const useAllTag = () => {
  const [fetchTags, { updateQuery, refetch, data }] = useLazyQuery<
    QueryTagResponse,
    QueryTagSearch
  >(QUERY_TAG, {
    variables: {
      search: {
        current: DEFAULT_CURRENT,
        pageSize: MAX_PAGE_SIZE,
      },
    },
  })
  return { fetchTags, updateQuery, refetch, data } as const
}

export const useCreateTag = () => {
  const [createTag] = useMutation<CreateTagResponse, CreateTagInput>(CREATE_TAG)
  return createTag
}

export const useDeleteTag = () => {
  const [deleteTag] = useMutation<void, ID>(DELETE_TAG)
  return deleteTag
}

export const useUpdateTag = () => {
  const [updateTag] = useMutation<UpdateTagResponse, UpdateTagInput>(UPDATE_TAG)
  return updateTag
}

export const useSyncTagCount = () => {
  const [syncTagCount] = useMutation(SYNC_TAG_COUNT)
  return syncTagCount
}
