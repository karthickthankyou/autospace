import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Map } from '../Map'
import { Panel } from '../Panel'
import ZoomControls from './ZoomControls'

const meta: Meta<typeof ZoomControls> = {
  component: ZoomControls,
  decorators: [
    (Story) => {
      const [viewState, setViewState] = useState({
        latitude: 12.9,
        longitude: 80.2,
        zoom: 8,
      })
      return <Map initialViewState={viewState}>{Story()}</Map>
    },
  ],
}
export default meta

type Story = StoryObj<typeof ZoomControls>

export const Primary: Story = {
  render: () => {
    return (
      <Panel>
        <ZoomControls>
          <ZoomControls.ZoomIn />
          <ZoomControls.ZoomOut />
        </ZoomControls>
      </Panel>
    )
  },
}
