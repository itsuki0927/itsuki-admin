import { gql } from '@apollo/client';
import type {
  Comment,
  CommentSearchRequest,
  CommentUpdateRequest,
} from '@/entities/comment';
import type {
  ID,
  MutationRequest,
  SearchRequest,
  SearchResponse,
} from '@/helper/basicType';

export type QueryCommentsResponse = {
  comments: SearchResponse<Comment>;
};

export type QueryCommentResponse = {
  comment: Comment;
};

export type CreateAdminCommentResponse = {
  adminComment: Comment;
};

export type UpdateCommentResponse = {
  updateComment: Comment;
};

export type QueryCommentsSearch = SearchRequest<CommentSearchRequest>;

export type UpdateCommentStateInput = ID & Pick<Comment, 'state'>;

export type UpdateCommentInput = ID & MutationRequest<CommentUpdateRequest>;

export type CreateAdminCommentInput = MutationRequest<
  Pick<Comment, 'content' | 'blogId' | 'parentId' | 'agent'>
>;

export const QUERY_COMMENTS = gql`
  query findComments($search: SearchCommentInput!) {
    comments(search: $search) {
      total
      data {
        id
        createAt
        updateAt
        nickname
        email
        provider
        avatar
        content
        ip
        agent
        city
        province
        state
        blogTitle
        blogDescription
        parentNickName
        parentId
        blogId
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(id: $id)
  }
`;

export const UPDATE_COMMENT_STATE = gql`
  mutation updateCommentState($id: ID!, $state: Int!) {
    updateCommentState(id: $id, state: $state)
  }
`;

export const QUERY_COMMENT = gql`
  query fetchComment($id: ID!) {
    comment(id: $id) {
      id
      createAt
      updateAt
      nickname
      email
      provider
      avatar
      ip
      blogTitle
      blogDescription
      content
      agent
      city
      province
      state
      parentId
      parentNickName
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation updateComment($id: ID!, $input: UpdateCommentInput!) {
    updateComment(id: $id, input: $input) {
      nickname
      email
      provider
      avatar
      id
      ip
      blogTitle
      blogDescription
      content
      liking
      agent
      city
      province
      state
      fix
      expand
      parentId
      parentNickName
    }
  }
`;

export const ADMIN_COMMENT = gql`
  mutation adminCommnet($input: AdminCommentInput!) {
    adminComment(input: $input) {
      nickname
      email
      content
    }
  }
`;
