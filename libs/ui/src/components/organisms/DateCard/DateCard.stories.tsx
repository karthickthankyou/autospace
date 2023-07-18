import type { Meta, StoryObj } from '@storybook/react'
import { DateCard } from './DateCard'

const meta: Meta<typeof DateCard> = {
  component: DateCard,
}
export default meta

type Story = StoryObj<typeof DateCard>

export const Primary: Story = {
  args: {
    dateTime: new Date().toISOString(),
  },
}

export const JustifyRight: Story = {
  args: {
    dateTime: new Date().toISOString(),
    justify: 'right',
  },
}
