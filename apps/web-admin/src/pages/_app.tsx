import '@/styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'

import { ApolloProvider } from '@autospace-org/network/src/config/apollo'
import { ReduxProvider } from '@autospace-org/store/Provider'
import { AppLevelListeners } from '@autospace-org/ui/src/components/atoms/AppLevelListeners'
import { Header } from '@autospace-org/ui/src/components/organisms/Header'
import { Notifications } from '@autospace-org/ui/src/components/organisms/Notifications'
import type { AppProps } from 'next/app'

import { MenuItem } from '@autospace-org/types'

const MENUITEMS: MenuItem[] = [
  { label: 'Garages', href: '/', loggedIn: true },
  { label: 'Admins', href: '/manageAdmins', loggedIn: true },
  { label: 'Settings', href: '/settings', loggedIn: true },
]
const SUBMENUITEMS: MenuItem[] = [...MENUITEMS]
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <ApolloProvider>
        <AppLevelListeners />
        <Header
          type="admin"
          menuItems={MENUITEMS}
          sideMenuItems={SUBMENUITEMS}
        />
        <Component {...pageProps} />
        <Notifications />
      </ApolloProvider>
    </ReduxProvider>
  )
}
