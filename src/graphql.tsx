import { ApolloClient, ApolloLink, createHttpLink, concat, InMemoryCache } from '@apollo/client'
import { API_URL, API_VERSION } from './config'
import { getToken } from './utils/auth'

const httpLink = createHttpLink({
  uri: `${API_URL}/${API_VERSION}/graphql`,
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
  cache: new InMemoryCache(),
  connectToDevTools: true,
})
