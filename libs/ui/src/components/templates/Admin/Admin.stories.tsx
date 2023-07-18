import type { Meta, StoryObj } from '@storybook/react'
import { Admin } from './Admin'
import { graphql } from 'msw'
import {
  CreateVerificationMutation,
  GaragesQuery,
  namedOperations,
} from '@autospace-org/network/src/generated'
import { garages } from '@autospace-org/network/src/data'

const meta: Meta<typeof Admin> = {
  component: Admin,
}
export default meta

type Story = StoryObj<typeof Admin>

export const Primary: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query<GaragesQuery>(
          namedOperations.Query.Garages,
          (req, res, ctx) => {
            return res(
              ctx.data({
                garages: garages.garages,
                garagesCount: { count: garages.garages.length },
              }),
            )
          },
        ),
        graphql.mutation<CreateVerificationMutation>(
          namedOperations.Mutation.createVerification,
          (req, res, ctx) => {
            return res(
              ctx.data({
                createVerification: {
                  adminId: '1',
                  createdAt: new Date(),
                  garageId: 1,
                  updatedAt: new Date(),
                  verified: true,
                  __typename: 'Verification',
                },
              }),
            )
          },
        ),
      ],
    },
  },
}
