import type { Meta, StoryObj } from '@storybook/react'
import { HtmlLabel } from '../HtmlLabel'
import { HtmlSelect } from './HtmlSelect'

const meta: Meta<typeof HtmlSelect> = {
  component: HtmlSelect,
}
export default meta

type Story = StoryObj<typeof HtmlSelect>
const options = ['One', 'Two', 'Three', 'Four', 'Five']

export const Primary: Story = {
  args: {
    children: options.map((option) => <option key={option}>{option}</option>),
  },
}

export const WithLabel: Story = {
  render: (args) => (
    <HtmlLabel title="Select a number">
      <HtmlSelect {...args} />
    </HtmlLabel>
  ),
  args: {
    children: options.map((option) => <option key={option}>{option}</option>),
  },
}
