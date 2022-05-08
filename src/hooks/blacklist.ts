import type {
  QueryBlacklistResponse,
  UpdateBlackListInput,
  UpdateBlacklistResponse,
} from '@/graphql/blacklist'
import { QUERY_BLACKLIST, UPDATE_BLACKLIST } from '@/graphql/blacklist'
import { useLazyQuery, useMutation } from '@apollo/client'

export const useBlackList = () => {
  return useLazyQuery<QueryBlacklistResponse, void>(QUERY_BLACKLIST)
}

export const useUpdateBlackList = () => {
  return useMutation<UpdateBlacklistResponse, UpdateBlackListInput>(UPDATE_BLACKLIST)
}
