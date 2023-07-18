import { Shadows } from './Shadows'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Shadows> = {
  component: Shadows,
}

export default meta
type Story = StoryObj<typeof Shadows>

export const Primary: Story = {
  render: () => <Shadows />,
}
