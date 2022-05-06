import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'http://localhost:5555/v1/graphql',
  cache: new InMemoryCache(),
  connectToDevTools: true,
})
