import { ApolloProvider } from '@autospace-org/network/src/config/apollo'
import { ReactNode } from 'react'
import { AppLevelListeners } from '../../atoms/AppLevelListeners'
import { Layout } from '../../templates/Layout'
import { Notifications } from '../../organisms/Notifications'

export interface IProvidersProps {
  children: ReactNode
}

export const Providers = ({ children }: IProvidersProps) => {
  return (
    <ApolloProvider>
      <Layout>
        <AppLevelListeners />
        <div>{children}</div>
        <Notifications />
      </Layout>
    </ApolloProvider>
  )
}
