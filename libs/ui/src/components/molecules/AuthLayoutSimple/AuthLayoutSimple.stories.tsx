import type { Meta, StoryObj } from '@storybook/react'
import { AuthLayoutSimple } from './AuthLayoutSimple'

const meta: Meta<typeof AuthLayoutSimple> = {
  component: AuthLayoutSimple,
}
export default meta

type Story = StoryObj<typeof AuthLayoutSimple>

export const Primary: Story = {
  args: {
    children: <div className="h-64 bg-gray-50" />,
    title: 'Layout title',
  },
}
