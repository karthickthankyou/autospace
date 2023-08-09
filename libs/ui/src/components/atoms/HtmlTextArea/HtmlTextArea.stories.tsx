import type { Meta, StoryObj } from '@storybook/react'
import { HtmlLabel } from '../HtmlLabel'
import { HtmlTextArea } from './HtmlTextArea'

const meta: Meta<typeof HtmlTextArea> = {
  component: HtmlTextArea,
}
export default meta

type Story = StoryObj<typeof HtmlTextArea>

export const Primary: Story = {
  render: (args) => {
    return <HtmlTextArea {...args} />
  },
  args: {
    rows: 2,
    placeholder: 'Type something. It does not matter.',
  },
}

export const FiveRows: Story = {
  render: (args) => {
    return <HtmlTextArea {...args} />
  },
  args: {
    rows: 5,
    placeholder: 'Type something longer.',
  },
}

export const WithLabel: Story = {
  render: (args) => (
    <HtmlLabel title="Label text">
      <HtmlTextArea {...args} />
    </HtmlLabel>
  ),
  args: {
    rows: 5,
    placeholder: 'Type something longer.',
  },
}
