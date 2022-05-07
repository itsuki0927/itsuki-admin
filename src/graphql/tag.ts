import { gql } from '@apollo/client'

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
