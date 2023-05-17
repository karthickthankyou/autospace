import '@/styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'

import type { AppProps } from 'next/app'
import { ApolloProvider } from '@autospace-org/network/src/config/apollo'
import { AppLevelListeners } from '@autospace-org/ui/src/components/atoms/AppLevelListeners'
import { Notifications } from '@autospace-org/ui/src/components/organisms/Notifications'
import { Header } from '@autospace-org/ui/src/components/organisms/Header'
import { MenuItem } from '@autospace-org/types'

const MENUITEMS: MenuItem[] = [
  { label: 'Manage admins', href: '/manageAdmins', loggedIn: false },
  { label: 'Garages', href: '/garages', loggedIn: true },
]
const SUBMENUITEMS: MenuItem[] = [
  ...MENUITEMS,
  { label: 'Settings', href: '/settings', loggedIn: false },
]
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider>
      <AppLevelListeners />
      <Header type="admin" menuItems={MENUITEMS} sideMenuItems={SUBMENUITEMS} />
      <Component {...pageProps} />
      <Notifications />
    </ApolloProvider>
  )
}
