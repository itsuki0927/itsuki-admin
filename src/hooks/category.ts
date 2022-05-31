import type {
  CreateCategoryInput,
  CreateCategoryResponse,
  QueryCategoryResponse,
  UpdateCategoryInput,
  UpdateCategoryResponse,
} from '@/graphql/category'
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  QUERY_CATEGORY,
  SYNC_CATEGORY_COUNT,
  UPDATE_CATEGORY,
} from '@/graphql/category'
import type { ID } from '@/helper/http.interface'
import { useLazyQuery, useMutation } from '@apollo/client'

export const useCategories = () => {
  const [fetchCategory, { data, updateQuery, refetch }] =
    useLazyQuery<QueryCategoryResponse>(QUERY_CATEGORY)
  return { fetchCategory, data, updateQuery, refetch } as const
}

export const useCreateCategory = () => {
  const [createCategory] = useMutation<CreateCategoryResponse, CreateCategoryInput>(
    CREATE_CATEGORY,
    {
      update: (cache, { data }) => {
        const newCategory = data?.createCategory
        const existCategoryies = cache.readQuery<QueryCategoryResponse>({
          query: QUERY_CATEGORY,
        })
        if (existCategoryies && newCategory) {
          cache.writeQuery({
            query: QUERY_CATEGORY,
            data: {
              categories: [...existCategoryies.categories, newCategory],
            },
          })
        }
        return true
      },
    }
  )
  return createCategory
}

export const useUpdateCategory = () => {
  const [updateCategory] = useMutation<UpdateCategoryResponse, UpdateCategoryInput>(UPDATE_CATEGORY)
  return updateCategory
}

export const useDeleteCategory = () => {
  const [deleteCategory] = useMutation<number, ID>(DELETE_CATEGORY)
  return deleteCategory
}

export const useSyncCategoryCount = () => {
  const [syncCategoryCount] = useMutation(SYNC_CATEGORY_COUNT)
  return syncCategoryCount
}
