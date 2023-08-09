import { bookings } from '@autospace-org/network/src/data'
import {
  BookingsForGarageQuery,
  namedOperations,
} from '@autospace-org/network/src/generated'
import type { Meta, StoryObj } from '@storybook/react'
import { graphql } from 'msw'
import { ListBookings } from './ListBookings'

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
