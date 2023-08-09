import type { Meta, StoryObj } from '@storybook/react'
import { HtmlInput } from '../HtmlInput'
import { HtmlLabel } from './HtmlLabel'

const meta: Meta<typeof HtmlLabel> = {
  component: HtmlLabel,
}
export default meta

type Story = StoryObj<typeof HtmlLabel>

export const Primary: Story = {
  args: {
    title: 'Username',
    error: 'Your username is invalid.',
  },
}

export const WithInput: Story = {
  render: (args) => (
    <HtmlLabel {...args}>
      <HtmlInput placeholder="Enter that invalid username." />
    </HtmlLabel>
  ),
  args: {
    title: 'Username',
    error: 'Your username is invalid.',
  },
}
