import type { Meta, StoryObj } from '@storybook/react'
import { ListBookings } from './ListBookings'
import { graphql } from 'msw'
import {
  BookingStatus,
  BookingsForGarageQuery,
  namedOperations,
} from '@autospace-org/network/src/generated'
import { bookings } from '@autospace-org/network/src/data'

const meta: Meta<typeof ListBookings> = {
  component: ListBookings,
}
export default meta

type Story = StoryObj<typeof ListBookings>

export const Primary: Story = {
  args: {
    garageId: 1,
  },
  parameters: {
    msw: {
      handlers: [
        graphql.query<BookingsForGarageQuery>(
          namedOperations.Query.bookingsForGarage,
          (req, res, ctx) => {
            return res(
              ctx.data({
                bookingsForGarage: bookings.bookings,
                bookingsCount: { count: bookings.bookings.length },
              }),
            )
          },
        ),
      ],
    },
  },
}
