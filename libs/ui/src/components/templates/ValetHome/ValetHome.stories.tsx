import {
  valetDropsData,
  valetPickupsData,
} from '@autospace-org/network/src/data'
import {
  namedOperations,
  ValetDropsQuery,
  ValetPickupsQuery,
} from '@autospace-org/network/src/generated'
import { ReduxAddUid } from '@autospace-org/store/Provider'
import type { Meta, StoryObj } from '@storybook/react'
import { graphql } from 'msw'
import { ValetHome } from './ValetHome'

const meta: Meta<typeof ValetHome> = {
  component: ValetHome,
  decorators: [(Story) => <ReduxAddUid>{Story()}</ReduxAddUid>],
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
