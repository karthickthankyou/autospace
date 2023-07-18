import type { Meta, StoryObj } from '@storybook/react'
import { Marker } from './MapMarker'
import { Map } from '../Map'
import { useState } from 'react'

const meta: Meta<typeof Marker> = {
  component: Marker,
  decorators: [
    (Story) => {
      const [viewState, setViewState] = useState({
        latitude: 12.9,
        longitude: 80.2,
        zoom: 2,
      })
      return <Map initialViewState={viewState}>{Story()}</Map>
    },
  ],
}
export default meta

type Story = StoryObj<typeof Marker>

export const Primary: Story = {
  args: {
    latitude: 13,
    longitude: 80,
  },
}

export const Draggable: Story = {
  args: {
    latitude: 13,
    longitude: 80,
    draggable: true,
  },
}
