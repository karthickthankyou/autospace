import type { Meta, StoryObj } from '@storybook/react'
import { ValetHome } from './ValetHome'
import { graphql } from 'msw'
import {
  ValetDropsQuery,
  ValetPickupsQuery,
  namedOperations,
} from '@autospace-org/network/src/generated'
import {
  valetDropsData,
  valetPickupsData,
} from '@autospace-org/network/src/data'

const meta: Meta<typeof ValetHome> = {
  component: ValetHome,
}
export default meta

type Story = StoryObj<typeof ValetHome>

export const Primary: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query<ValetPickupsQuery>(
          namedOperations.Query.valetPickups,
          (req, res, ctx) => res(ctx.data(valetPickupsData)),
        ),
        graphql.query<ValetDropsQuery>(
          namedOperations.Query.valetDrops,
          (req, res, ctx) => res(ctx.data(valetDropsData)),
        ),
      ],
    },
  },
}
