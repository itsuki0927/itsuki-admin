import { ApolloClient, ApolloLink, createHttpLink, concat, InMemoryCache } from '@apollo/client'
import { getToken } from './utils/auth'

const httpLink = createHttpLink({
  uri: 'http://localhost:5555/v1/graphql',
})

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = getToken()
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }))

  return forward(operation)
})

export const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          tags: {
            keyArgs: false,
            merge: true,
          },
        },
      },
    },
  }),
  connectToDevTools: true,
})
