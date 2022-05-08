import type { MutationRequest } from '@/helper/http.interface'
import type { API } from '@/services/ant-design-pro/typings'
import { gql } from '@apollo/client'

export type QueryBlacklistResponse = {
  blacklist: API.Blacklist
}

export type UpdateBlacklistResponse = {
  updateBlackList: API.Blacklist
}

export type UpdateBlackListInput = MutationRequest<Pick<API.Blacklist, 'ip' | 'email' | 'keyword'>>

export const QUERY_BLACKLIST = gql`
  query fetchBlackList {
    blacklist {
      ip
      email
      keyword
    }
  }
`

export const UPDATE_BLACKLIST = gql`
  mutation updateBlackList($input: UpdateBlackListInput!) {
    updateBlackList(input: $input) {
      ip
      email
      keyword
    }
  }
`
