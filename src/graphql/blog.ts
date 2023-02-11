import { gql } from '@apollo/client';
import type {
  BlogActionRequest,
  BlogDetailResponse,
  SearchBlogInput,
  BlogSummaryResponse,
  Blog,
} from '@/entities/blog';
import type {
  ID,
  MutationRequest,
  SearchRequest,
  SearchResponse,
} from '@/helper/basicType';

export type QueryBlogsResponse = {
  blogs: SearchResponse<Blog>;
};

export type QueryBlogResponse = {
  blog: BlogDetailResponse;
};

export type QueryBlogInput = {
  path: string;
};

export type QueryBlogSearch = SearchRequest<SearchBlogInput>;

export type QueryBlogSummaryResponse = {
  blogSummary: BlogSummaryResponse;
};

export type UpdateBlogInput = MutationRequest<BlogActionRequest> & ID;

export const CREATE_BLOG = gql`
  mutation createBlog($input: CreateBlogInput!) {
    createBlog(input: $input) {
      id
    }
  }
`;

export const UPDATE_BLOG_BANNER = gql`
  mutation updateBlogBanner($ids: [ID]!, $banner: Int!) {
    updateBlogBanner(ids: $ids, banner: $banner)
  }
`;

export const UPDATE_BLOG_STATE = gql`
  mutation patchBlogState($ids: [ID]!, $state: Int!) {
    updateBlogState(ids: $ids, state: $state)
  }
`;

export const UPDATE_BLOG = gql`
  mutation updateBlog($id: ID!, $input: CreateBlogInput!) {
    updateBlog(id: $id, input: $input) {
      id
    }
  }
`;

export const DETELTE_BLOG = gql`
  mutation deleteBlog($id: ID!) {
    deleteBlog(id: $id)
  }
`;

export const QUERY_BLOG = gql`
  query findBlogDetail($path: String!) {
    blog(path: $path) {
      id
      createAt
      updateAt
      title
      description
      content
      author
      cover
      keywords
      publish
      banner
      reading
      liking
      commenting
      path
      cardStyle
      tags {
        name
        id
      }
    }
  }
`;

export const QUERY_BLOGS = gql`
  query findBlogs($search: SearchBlogInput) {
    blogs(search: $search) {
      total
      data {
        id
        createAt
        updateAt
        title
        publish
        description
        path
        keywords
        cover
        commenting
        author
        liking
        reading
        banner
        cardStyle
        tags {
          id
          name
        }
      }
    }
  }
`;

export const SYNC_BLOG_COMMENT_COUNT = gql`
  mutation syncBlogCommentCount($ids: [ID]!) {
    syncBlogCommentCount(ids: $ids)
  }
`;

export const BLOG_SUMMARY = gql`
  query blogSummary {
    blogSummary {
      total {
        publish
        value
        title
        state
      }
      draft {
        publish
        value
        title
        state
      }
      recycle {
        publish
        value
        title
        state
      }
      published {
        publish
        value
        title
        state
      }
    }
  }
`;
