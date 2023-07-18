import type { Meta, StoryObj } from '@storybook/react'
import { Price } from './Price'

const meta: Meta<typeof Price> = {
  component: Price,
}
export default meta

type Story = StoryObj<typeof Price>

export const Primary: Story = {
  args: { children: 12.99 },
}
