import type { Meta, StoryObj } from '@storybook/react'
import { HeaderText } from './HeaderText'

const meta: Meta<typeof HeaderText> = {
  component: HeaderText,
}
export default meta

type Story = StoryObj<typeof HeaderText>

export const Primary: Story = {
  args: {
    children: 'Hello. This is the opinionated header text.',
  },
}
