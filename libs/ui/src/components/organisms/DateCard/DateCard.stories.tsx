import { toLocalISOString } from '@autospace-org/util'
import type { Meta, StoryObj } from '@storybook/react'
import { DateCard } from './DateCard'

const meta: Meta<typeof DateCard> = {
  component: DateCard,
}
export default meta

type Story = StoryObj<typeof DateCard>

export const Primary: Story = {
  args: {
    dateTime: toLocalISOString(new Date()),
  },
}

export const JustifyRight: Story = {
  args: {
    dateTime: toLocalISOString(new Date()),
    justify: 'right',
  },
}
