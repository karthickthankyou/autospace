import type { Meta, StoryObj } from '@storybook/react'
import { FilterHeading } from './FilterHeading'

const meta: Meta<typeof FilterHeading> = {
  component: FilterHeading,
}
export default meta

type Story = StoryObj<typeof FilterHeading>

export const Primary: Story = {
  args: {
    dirty: false,
    title: 'Filter products',
  },
}

export const Dirty: Story = {
  args: {
    dirty: true,
    title: 'Filter products',
  },
}
