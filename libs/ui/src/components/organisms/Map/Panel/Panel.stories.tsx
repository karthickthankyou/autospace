import type { Meta, StoryObj } from '@storybook/react'
import { Panel } from './Panel'
import { Map } from '../Map'
import { useState } from 'react'

const meta: Meta<typeof Panel> = {
  component: Panel,
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

type Story = StoryObj<typeof Panel>

export const Primary: Story = {
  args: {
    children: <div className="p-3 bg-white">Im the panel.</div>,
    position: 'center-bottom',
  },
}
