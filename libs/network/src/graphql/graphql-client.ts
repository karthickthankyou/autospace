import Cookies from 'js-cookie'
import { GraphQLClient } from 'graphql-request'

export const getGraphqlClient = async () => {
  return new GraphQLClient('http://localhost:3000/graphql', {
    headers: {
      authorization: `Bearer ${Cookies.get('authToken')}`,
    },
  })
}
