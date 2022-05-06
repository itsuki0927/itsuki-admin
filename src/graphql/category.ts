import type { API } from '@/services/ant-design-pro/typings'
import { gql } from '@apollo/client'

export type CategoryActionInput = Omit<API.Category, 'id' | 'count' | 'createAt' | 'updateAt'>

export type CreateCategoryResponse = { createCategory: API.Category }

export type UpdateCategoryResponse = { updateCategory: API.Category }

export type QueryCategoryResponse = { categories: API.Category[] }

export type CategoryId = { categoryId: number }

export type CreateCategoryInput = { input: CategoryActionInput }

export type UpdateCategoryInput = CreateCategoryInput & CategoryId

export const QUERY_CATEGORY = gql`
  fragment CategoryFragment on Category {
    name
    id
    path
    description
    count
    sort
    expand
  }
  query findCategories {
    categories {
      ...CategoryFragment
    }
  }
`

export const CREATE_CATEGORY = gql`
  mutation createCategory($input: CategoryActionInput!) {
    createCategory(input: $input) {
      name
      id
      path
      description
      count
      sort
      expand
    }
  }
`

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($categoryId: ID!, $input: CategoryActionInput!) {
    updateCategory(categoryId: $categoryId, input: $input) {
      name
      id
      path
      description
      count
      sort
      expand
    }
  }
`

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($categoryId: ID!) {
    deleteCategory(categoryId: $categoryId)
  }
`
