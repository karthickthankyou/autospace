import { companyValets } from '@autospace-org/network/src/data'
import {
  CompanyValetsQuery,
  namedOperations,
} from '@autospace-org/network/src/generated'
import { ReduxAddUid } from '@autospace-org/store/Provider'
import type { Meta, StoryObj } from '@storybook/react'
import { graphql } from 'msw'
import { ManageValets } from './ManageValets'

const meta: Meta<typeof ManageValets> = {
  component: ManageValets,
  decorators: [(Story) => <ReduxAddUid>{Story()}</ReduxAddUid>],
}
export default meta

type Story = StoryObj<typeof ManageValets>

export const Primary: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query<CompanyValetsQuery>(
          namedOperations.Query.companyValets,
          (req, res, ctx) => res(ctx.data(companyValets)),
        ),
      ],
    },
  },
}
