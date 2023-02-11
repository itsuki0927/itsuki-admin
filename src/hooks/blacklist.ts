import { useLazyQuery, useMutation } from '@apollo/client';
import type {
  QueryBlacklistResponse,
  UpdateBlackListInput,
  UpdateBlacklistResponse,
} from '@/graphql/blacklist';
import { QUERY_BLACKLIST, UPDATE_BLACKLIST } from '@/graphql/blacklist';

export const useBlackList = () => {
  return useLazyQuery<QueryBlacklistResponse>(QUERY_BLACKLIST);
};

export const useUpdateBlackList = () => {
  return useMutation<UpdateBlacklistResponse, UpdateBlackListInput>(UPDATE_BLACKLIST);
};
