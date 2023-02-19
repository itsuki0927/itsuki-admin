/* eslint-disable no-restricted-globals */
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { notification, Space, Typography } from 'antd';
import { API_URL, API_VERSION } from './config';
import { getToken, removeToken } from './utils/auth';

export const baseURI = `${API_URL}/${API_VERSION}/graphql`;

const httpLink = new HttpLink({
  uri: baseURI,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.debug(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
          locations
        )}, Path: ${path}`
      );
      notification.error({
        message: '请求错误',
        description: (
          <Space size={6} direction='vertical'>
            <Typography.Text>原因: {message}</Typography.Text>
            <Typography.Text>路径: {path}</Typography.Text>
          </Space>
        ),
        duration: 3,
      });
    });
  }

  if (networkError) {
    console.log(location);
    console.debug(`[Network error]: ${networkError}`);
    // location.href = '/login';
    removeToken();
    notification.error({
      message: '请求错误',
      description: '网络不通? 后端不通?, 好兄弟',
      duration: 3,
    });
  }
});

const authLink = new ApolloLink((operation, forward) => {
  const token = getToken();
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }));
  return forward(operation);
});

const consoleLink = new ApolloLink((operation, forward) => {
  console.log(`[GraphQL]: starting request for ${operation.operationName}`);
  return forward(operation).map(data => {
    console.log(`[GraphQL]: ending request for ${operation.operationName}`);
    return data;
  });
});

const roundTripLink = new ApolloLink((operation, forward) => {
  operation.setContext({ start: new Date() });

  return forward(operation).map(data => {
    const time = Date.now() - operation.getContext().start;
    console.log(
      `[GraphQL]: Operation ${operation.operationName} took ${time} to complete`
    );
    return data;
  });
});

const link = from([consoleLink, roundTripLink, errorLink, authLink, httpLink]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
