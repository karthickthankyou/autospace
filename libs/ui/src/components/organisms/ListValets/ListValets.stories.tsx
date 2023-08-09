import type { Meta, StoryObj } from '@storybook/react'
import { ListValets } from './ListValets'

const meta: Meta<typeof ListValets> = {
  component: ListValets,
}
export default meta

type Story = StoryObj<typeof ListValets>

export const Primary: Story = {}
