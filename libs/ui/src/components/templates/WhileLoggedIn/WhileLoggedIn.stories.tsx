import type { Meta, StoryObj } from '@storybook/react'
import { WhileLoggedIn } from './WhileLoggedIn'

const meta: Meta<typeof WhileLoggedIn> = {
  component: WhileLoggedIn,
}
export default meta

type Story = StoryObj<typeof WhileLoggedIn>

export const Primary: Story = {}
