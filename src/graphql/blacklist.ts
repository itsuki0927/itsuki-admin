import { gql } from '@apollo/client';
import type { MutationRequest } from '@/helper/http.interface';
import type { API } from '@/entities/typings';

export type QueryBlacklistResponse = {
  blacklist: API.Blacklist;
};

export type UpdateBlacklistResponse = {
  updateBlackList: API.Blacklist;
};

export type UpdateBlackListInput = MutationRequest<{
  ip: string;
  email: string;
  keyword: string;
}>;

export const QUERY_BLACKLIST = gql`
  query fetchBlackList {
    blacklist {
      ip
      email
      keyword
    }
  }
`;

export const UPDATE_BLACKLIST = gql`
  mutation updateBlackList($input: UpdateBlackListInput!) {
    updateBlackList(input: $input) {
      ip
      email
      keyword
    }
  }
`;
