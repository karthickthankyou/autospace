import { myCompany } from '@autospace-org/network/src/data'
import {
  CreateCompanyMutation,
  MyCompanyQuery,
  namedOperations,
} from '@autospace-org/network/src/generated'
import type { Meta, StoryObj } from '@storybook/react'
import { graphql } from 'msw'
import { CreateCompany } from './CreateCompany'

const meta: Meta<typeof CreateCompany> = {
  component: CreateCompany,
}
export default meta

type Story = StoryObj<typeof CreateCompany>

export const Primary: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query<MyCompanyQuery>(
          namedOperations.Query.myCompany,
          (req, res, ctx) => {
            return res(
              ctx.data({
                garagesCount: { count: 2 },
                myCompany: myCompany.myCompany,
              }),
            )
          },
        ),
        graphql.mutation<CreateCompanyMutation>(
          namedOperations.Mutation.createCompany,
          (req, res, ctx) => {
            return res(
              ctx.data({
                createCompany: {
                  id: 1,
                },
              }),
            )
          },
        ),
      ],
    },
  },
}
