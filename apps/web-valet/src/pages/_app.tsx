import '@/styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'

import { ApolloProvider } from '@autospace-org/network/src/config/apollo'
import { ReduxProvider } from '@autospace-org/store/Provider'
import { MenuItem } from '@autospace-org/types'
import { AppLevelListeners } from '@autospace-org/ui'
import { Footer } from '@autospace-org/ui/src/components/organisms/Footer'
import { Header } from '@autospace-org/ui/src/components/organisms/Header'
import { Notifications } from '@autospace-org/ui/src/components/organisms/Notifications'
import type { AppProps } from 'next/app'

const MENUITEMS: MenuItem[] = [
  { label: 'My Trips', href: '/my-trips', loggedIn: true },
]
const SUBMENUITEMS: MenuItem[] = [
  ...MENUITEMS,
  { label: 'Contact', href: '/contact', loggedIn: false },
]

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <ApolloProvider>
        <AppLevelListeners />

        <Header
          type="valet"
          menuItems={MENUITEMS}
          sideMenuItems={SUBMENUITEMS}
        />

        <Component {...pageProps} />
        <Footer />
        <Notifications />
      </ApolloProvider>
    </ReduxProvider>
  )
}
