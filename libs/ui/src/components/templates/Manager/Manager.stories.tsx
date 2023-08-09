import { myCompany } from '@autospace-org/network/src/data'
import {
  MyCompanyQuery,
  namedOperations,
} from '@autospace-org/network/src/generated'
import { ReduxAddUid } from '@autospace-org/store/Provider'
import type { Meta, StoryObj } from '@storybook/react'
import { graphql } from 'msw'
import { Manager } from './Manager'

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
