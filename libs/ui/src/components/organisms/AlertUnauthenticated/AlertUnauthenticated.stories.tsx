import type { Meta, StoryObj } from '@storybook/react'
import { AlertUnauthenticated } from './AlertUnauthenticated'

const meta: Meta<typeof AlertUnauthenticated> = {
  component: AlertUnauthenticated,
}
export default meta

type Story = StoryObj<typeof AlertUnauthenticated>

export const Primary: Story = {
  args: {},
}
