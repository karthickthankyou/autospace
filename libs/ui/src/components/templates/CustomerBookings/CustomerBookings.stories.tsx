import type { Meta, StoryObj } from '@storybook/react'
import { CustomerBookings } from './CustomerBookings'
import { graphql } from 'msw'
import {
  BookingsQuery,
  namedOperations,
} from '@autospace-org/network/src/generated'
import { bookings } from '@autospace-org/network/src/data'

const meta: Meta<typeof CustomerBookings> = {
  component: CustomerBookings,
}
export default meta

type Story = StoryObj<typeof CustomerBookings>

export const Primary: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query<BookingsQuery>(
          namedOperations.Query.bookings,
          (req, res, ctx) =>
            res(
              ctx.data({
                bookings: bookings.bookings,
                bookingsCount: { count: bookings.bookings.length },
              }),
            ),
        ),
      ],
    },
  },
}
