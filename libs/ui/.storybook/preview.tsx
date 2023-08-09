import 'mapbox-gl/dist/mapbox-gl.css'
import { initialize, mswLoader } from 'msw-storybook-addon'
import 'react-quill/dist/quill.snow.css'
import '../src/index.css'

import { ApolloProvider } from '@autospace-org/network/src/config/apollo'
import { ReduxProvider } from '@autospace-org/store/Provider'
import type { Preview } from '@storybook/react'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import * as NextImage from 'next/image'

// Initialize MSW
initialize({
  onUnhandledRequest: 'bypass',
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    nextRouter: {
      Provider: RouterContext.Provider, // next 13 (using next/router) / next < 12
    },
  },
  decorators: [
    (Story) => (
      <ReduxProvider>
        <ApolloProvider>
          <Story />
        </ApolloProvider>
      </ReduxProvider>
    ),
  ],
  loaders: [mswLoader],
}

// Override next/image during Storybook testing
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => {
    return <img {...props} />
  },
})

export default preview
