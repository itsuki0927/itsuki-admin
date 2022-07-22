import { gql } from '@apollo/client';
import type { MutationRequest } from '@/helper/http.interface';
import type { Blacklist } from '@/entities/blacklist';

export type QueryBlacklistResponse = {
  blacklist: Blacklist;
};

export type UpdateBlacklistResponse = {
  updateBlackList: Blacklist;
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
