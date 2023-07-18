import type { Meta, StoryObj } from '@storybook/react'
import { Rating } from './Rating'

const meta: Meta<typeof Rating> = {
  component: Rating,
}
export default meta

type Story = StoryObj<typeof Rating>

export const Small: Story = {
  args: { value: 4, size: 'small' },
}
export const Medium: Story = {
  args: { value: 3.3, size: 'medium' },
}
export const Large: Story = {
  args: { value: 2, size: 'large' },
}
export const Precision: Story = {
  args: { value: 2.6, size: 'large', precision: 0.5 },
}
