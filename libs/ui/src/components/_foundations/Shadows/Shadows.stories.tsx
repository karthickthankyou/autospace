import type { Meta, StoryObj } from '@storybook/react'
import { Shadows } from './Shadows'

const meta: Meta<typeof Shadows> = {
  component: Shadows,
}

export default meta
type Story = StoryObj<typeof Shadows>

export const Primary: Story = {
  render: () => <Shadows />,
}
