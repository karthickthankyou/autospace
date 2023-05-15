import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
} from '@apollo/client'
import { ReactNode } from 'react'

export interface IApolloProviderProps {
  children: ReactNode
}

export const ApolloProvider = ({ children }: IApolloProviderProps) => {
  // Create an Apollo Client instance
  const apolloClient = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    credentials: 'include',
    cache: new InMemoryCache(),
    connectToDevTools: true,
  })

  return <Provider client={apolloClient}>{children}</Provider>
}
