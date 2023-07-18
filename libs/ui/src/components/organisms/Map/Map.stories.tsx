import type { Meta, StoryObj } from '@storybook/react'
import { Map } from './Map'

const meta: Meta<typeof Map> = {
  component: Map,
}
export default meta

type Story = StoryObj<typeof Map>

export const Primary: Story = {
  args: {
    latitude: 12,
    longitude: 80,
    zoom: 10,
  },
}
