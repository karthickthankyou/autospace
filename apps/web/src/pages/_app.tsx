import '@/styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'

import { useIsPathInArray } from '@autospace-org/hooks/src'
import { ApolloProvider } from '@autospace-org/network/src/config/apollo'
import { ReduxProvider } from '@autospace-org/store/Provider'
import { MenuItem } from '@autospace-org/types'
import { AppLevelListeners } from '@autospace-org/ui/src/components/atoms/AppLevelListeners'
import { Footer } from '@autospace-org/ui/src/components/organisms/Footer'
import { Header } from '@autospace-org/ui/src/components/organisms/Header'
import { Notifications } from '@autospace-org/ui/src/components/organisms/Notifications'
import type { AppProps } from 'next/app'

const MENUITEMS: MenuItem[] = [
  { label: 'About', href: '/about', loggedIn: false },
  { label: 'Search', href: '/search', loggedIn: true },
  { label: 'Bookings', href: '/bookings', loggedIn: true },
]
const SUBMENUITEMS: MenuItem[] = [
  ...MENUITEMS,
  { label: 'Contact', href: '/contact', loggedIn: false },
  { label: 'FAQs', href: '/faqs', loggedIn: false },
  { label: 'How it works', href: '/how-it-works', loggedIn: false },
]

export default function App({ Component, pageProps }: AppProps) {
  const hideNav = useIsPathInArray(['/login', '/register'])
  return (
    <ReduxProvider>
      <ApolloProvider>
        <AppLevelListeners />
        {!hideNav ? (
          <Header menuItems={MENUITEMS} sideMenuItems={SUBMENUITEMS} />
        ) : null}
        <Component {...pageProps} />
        {!hideNav ? <Footer /> : null}
        <Notifications />
      </ApolloProvider>
    </ReduxProvider>
  )
}
