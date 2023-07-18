import type { Meta, StoryObj } from '@storybook/react'
import { ManageAdmins } from './ManageAdmins'
import { graphql } from 'msw'
import {
  AdminsQuery,
  namedOperations,
} from '@autospace-org/network/src/generated'
import { admins } from '@autospace-org/network/src/data'
import { ReduxAddUid } from '@autospace-org/store/Provider'

const meta: Meta<typeof ManageAdmins> = {
  component: ManageAdmins,
  decorators: [(Story) => <ReduxAddUid>{Story()}</ReduxAddUid>],
}
export default meta

type Story = StoryObj<typeof ManageAdmins>

export const Primary: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query<AdminsQuery>(
          namedOperations.Query.admins,
          (req, res, ctx) => res(ctx.data(admins)),
        ),
      ],
    },
  },
}
