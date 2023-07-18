import type { Meta, StoryObj } from '@storybook/react'
import { ManageBookingCard } from './ManageBookingCard'
import { bookings } from '@autospace-org/network/src/data'

const meta: Meta<typeof ManageBookingCard> = {
  component: ManageBookingCard,
}
export default meta

type Story = StoryObj<typeof ManageBookingCard>

export const Primary: Story = {
  args: {
    booking: bookings.bookings[0],
  },
}
