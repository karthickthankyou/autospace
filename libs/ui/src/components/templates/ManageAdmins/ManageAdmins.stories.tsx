import { admins } from '@autospace-org/network/src/data'
import {
  AdminsQuery,
  namedOperations,
} from '@autospace-org/network/src/generated'
import { ReduxAddUid } from '@autospace-org/store/Provider'
import type { Meta, StoryObj } from '@storybook/react'
import { graphql } from 'msw'
import { ManageAdmins } from './ManageAdmins'

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
