import { Spacing } from './Spacing'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Spacing> = {
  component: Spacing,
}

export default meta
type Story = StoryObj<typeof Spacing>

export const Primary: Story = {
  render: () => <Spacing />,
}
