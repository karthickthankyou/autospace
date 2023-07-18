import type { Meta, StoryObj } from '@storybook/react'
import { MyTrips } from './MyTrips'
import { graphql } from 'msw'
import {
  MyDropTripsQuery,
  MyPickupTripsQuery,
  namedOperations,
} from '@autospace-org/network/src/generated'
import {
  bookings,
  myDropTripsQueryData,
  myPickupTripsQueryData,
} from '@autospace-org/network/src/data'

const meta: Meta<typeof MyTrips> = {
  component: MyTrips,
}
export default meta

type Story = StoryObj<typeof MyTrips>

export const Primary: Story = {
  args: {
    uid: '234',
  },
  parameters: {
    msw: {
      handlers: [
        graphql.query<MyPickupTripsQuery>(
          namedOperations.Query.myPickupTrips,
          (req, res, ctx) => res(ctx.data(myPickupTripsQueryData)),
        ),
        graphql.query<MyDropTripsQuery>(
          namedOperations.Query.myDropTrips,
          (req, res, ctx) => res(ctx.data(myDropTripsQueryData)),
        ),
      ],
    },
  },
}
