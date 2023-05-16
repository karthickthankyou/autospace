import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { ReactNode } from 'react'
import { useUserStore } from '@autospace-org/store/user'
import jwtDecode from 'jwt-decode'

export interface IApolloProviderProps {
  children: ReactNode
}

export const ApolloProvider = ({ children }: IApolloProviderProps) => {
  const user = useUserStore((state) => ({ uid: state.uid, token: state.token }))

  //   Create an http link
  const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql',
  })

  const authLink = setContext(async (_, { headers }) => {
    if (!user.token) {
      return {
        headers,
      }
    }
    // return the headers to the context so httpLink can read them
    const decoded: any = jwtDecode(user.token || '')

    console.log('Auth running...', decoded, new Date(decoded?.exp * 1000))

    return {
      headers: {
        ...headers,
        authorization: user.token ? `Bearer ${user.token}` : '',
      },
    }
  })
  // Create an Apollo Client instance
  const apolloClient = new ApolloClient({
    uri: 'http://localhost:3001/graphql',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  })

  return <Provider client={apolloClient}>{children}</Provider>
}
