import { bookings } from '@autospace-org/network/src/data'
import type { Meta, StoryObj } from '@storybook/react'
import { CustomerBookingCard } from './BookingCard'

const meta: Meta<typeof CustomerBookingCard> = {
  component: CustomerBookingCard,
}
export default meta

type Story = StoryObj<typeof CustomerBookingCard>

export const Primary: Story = {
  args: {
    booking: bookings.bookings[0],
  },
}
