import { gql } from '@apollo/client'

export const QUERY_COMMENT = gql`
  query findComments($input: CommentSearchRequest!) {
    comments(input: $input) {
      total
      data {
        id
        nickname
        email
        website
        content
        liking
        ip
        agent
        city
        province
        status
        fix
        expand
        articleTitle
        articleDescription
        parentNickName
        parentId
        articleId
      }
    }
  }
`
