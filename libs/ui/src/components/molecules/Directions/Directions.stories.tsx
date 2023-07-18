import type { Meta, StoryObj } from '@storybook/react'
import { Directions } from './Directions'

const meta: Meta<typeof Directions> = {
  component: Directions,
}
export default meta

type Story = StoryObj<typeof Directions>

export const Primary: Story = {
  args: {
    end: {
      lat: 13,
      lng: 80,
    },
    start: {
      lat: 13,
      lng: 79,
    },
  },
}
