import type { Meta, StoryObj } from '@storybook/react'
import { ManageValets } from './ManageValets'
import { graphql } from 'msw'
import {
  CompanyValetsQuery,
  namedOperations,
} from '@autospace-org/network/src/generated'
import { companyValets } from '@autospace-org/network/src/data'

const meta: Meta<typeof ManageValets> = {
  component: ManageValets,
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
