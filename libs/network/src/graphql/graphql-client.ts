import { GraphQLClient } from 'graphql-request'
import Cookies from 'js-cookie'

export const getGraphqlClient = async () => {
  return new GraphQLClient(process.env.NEXT_PUBLIC_API_URL + '/graphql', {
    headers: {
      authorization: `Bearer ${Cookies.get('authToken')}`,
    },
  })
}
