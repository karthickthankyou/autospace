import type { Meta, StoryObj } from '@storybook/react'
import { IconShoppingBag } from '@tabler/icons-react'
import { PulsingDot } from './Dot'

const meta: Meta<typeof PulsingDot> = {
  component: PulsingDot,
}
export default meta

type Story = StoryObj<typeof PulsingDot>

export const Primary: Story = {
  render: () => (
    <div className="relative max-w-lg">
      <PulsingDot />
    </div>
  ),
}

export const WithIcon: Story = {
  render: (args) => (
    <div className="relative max-w-lg">
      <PulsingDot {...args} />
    </div>
  ),
  args: {
    children: <IconShoppingBag />,
  },
}
