import type { BaseSearchRequest, ID, SearchResponse } from '@/helper/http.interface'
import type { API } from '@/services/ant-design-pro/typings'
import { gql } from '@apollo/client'

export type QueryTagResponse = {
  tags: SearchResponse<API.Tag>
}

export type TagSearchRequest = {
  search: BaseSearchRequest<{ name?: string }>
}

export type CreateTagResponse = {
  createTag: API.Tag
}

export type UpdateTagResponse = {
  updateTag: API.Tag
}

type TagActionInput = Omit<API.Tag, 'id' | 'count' | 'createAt' | 'updateAt'>

export type CreateTagInput = { input: TagActionInput }

export type UpdateTagInput = CreateTagInput & ID

export const QUERY_TAG = gql`
  query findTags($search: TagSearchRequest) {
    tags(search: $search) {
      total
      data {
        name
        path
        id
        expand
        description
        count
        sort
      }
    }
  }
`

export const CREATE_TAG = gql`
  mutation createTag($input: TagActionInput!) {
    createTag(input: $input) {
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

export const DELETE_TAG = gql`
  mutation deleteTag($id: ID!) {
    deleteTag(id: $id)
  }
`

export const UPDATE_TAG = gql`
  mutation updateTag($id: ID!, $input: TagActionInput!) {
    updateTag(id: $id, input: $input) {
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
