import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ManageValets } from './ManageValets'

export default {
  title: 'src/components/templates/ManageValets',
  component: ManageValets,
} as ComponentMeta<typeof ManageValets>

const Template: ComponentStory<typeof ManageValets> = (args) => (
  <ManageValets {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
