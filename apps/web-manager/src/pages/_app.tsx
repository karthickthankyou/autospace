import '@/styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'

import type { AppProps } from 'next/app'
import { ApolloProvider } from '@autospace-org/network/src/config/apollo'
import { ReduxProvider } from '@autospace-org/store/Provider'
import { AppLevelListeners } from '@autospace-org/ui/src/components/atoms/AppLevelListeners'
import { Notifications } from '@autospace-org/ui/src/components/organisms/Notifications'

import { Footer } from '@autospace-org/ui/src/components/organisms/Footer'
import { Header } from '@autospace-org/ui/src/components/organisms/Header'
import { MenuItem } from '@autospace-org/types'

const MENUITEMS: MenuItem[] = [
  { label: 'New Garage', href: '/createGarage', loggedIn: true },
  { label: 'Valets', href: '/valets', loggedIn: true },
]
const SUBMENUITEMS: MenuItem[] = [
  ...MENUITEMS,
  { label: 'Contact', href: '/contact', loggedIn: false },
  { label: 'FAQs', href: '/faqs', loggedIn: false },
  { label: 'About', href: '/about', loggedIn: false },
  { label: 'How it works', href: '/how-it-works', loggedIn: false },
]

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <ApolloProvider>
        <AppLevelListeners />

        <Header
          type="manager"
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
