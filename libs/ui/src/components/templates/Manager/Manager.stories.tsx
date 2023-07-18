import type { Meta, StoryObj } from '@storybook/react'
import { Manager } from './Manager'
import { graphql } from 'msw'
import {
  MyCompanyQuery,
  namedOperations,
} from '@autospace-org/network/src/generated'
import { myCompany } from '@autospace-org/network/src/data'
import { ReduxAddUid } from '@autospace-org/store/Provider'

const meta: Meta<typeof Manager> = {
  component: Manager,
  decorators: [(Story) => <ReduxAddUid>{Story()}</ReduxAddUid>],
}
export default meta

type Story = StoryObj<typeof Manager>

export const Primary: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query<MyCompanyQuery>(
          namedOperations.Query.myCompany,
          (req, res, ctx) => res(ctx.data(myCompany)),
        ),
      ],
    },
  },
}
