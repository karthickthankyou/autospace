import type { Meta, StoryObj } from '@storybook/react'
import { Layout } from './Layout'

const meta: Meta<typeof Layout> = {
  component: Layout,
}
export default meta

type Story = StoryObj<typeof Layout>

export const Primary: Story = {
  args: {
    children: (
      <div className="flex items-center justify-center italic text-gray-700 h-96 outline-dashed outline-gray-200">
        Body content
      </div>
    ),
  },
}
