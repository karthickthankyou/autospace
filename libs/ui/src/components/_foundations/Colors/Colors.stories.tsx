import type { Meta, StoryObj } from '@storybook/react'
import Colors from './Colors'

const meta: Meta<typeof Colors> = {
  component: Colors,
}

export default meta
type Story = StoryObj<typeof Colors>

export const Primary: Story = {
  render: () => <Colors />,
}
