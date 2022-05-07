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
