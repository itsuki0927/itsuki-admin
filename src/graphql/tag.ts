import type {
  BaseSearchRequest,
  ID,
  MutationRequest,
  SearchRequest,
  SearchResponse,
} from '@/helper/http.interface'
import type { API } from '@/entities/typings'
import { gql } from '@apollo/client'

export type QueryTagResponse = {
  tags: SearchResponse<API.Tag>
}

export type TagSearchRequest = BaseSearchRequest<{ name?: string }>

export type QueryTagSearch = SearchRequest<TagSearchRequest>

export type CreateTagResponse = {
  createTag: API.Tag
}

export type UpdateTagResponse = {
  updateTag: API.Tag
}

type TagActionInput = Omit<API.Tag, 'id' | 'count' | 'createAt' | 'updateAt'>

export type CreateTagInput = MutationRequest<TagActionInput>

export type UpdateTagInput = CreateTagInput & ID

export const QUERY_TAG = gql`
  query findTags($search: TagSearchRequest) {
    tags(search: $search) {
      total
      data {
        id
        createAt
        updateAt
        name
        path
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

export const SYNC_TAG_COUNT = gql`
  mutation syncAllTagCount {
    syncAllTagCount
  }
`
