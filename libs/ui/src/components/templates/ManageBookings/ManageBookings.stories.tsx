import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ManageBookings } from './ManageBookings'

export default {
  title: 'src/components/templates/ManageBookings',
  component: ManageBookings,
} as ComponentMeta<typeof ManageBookings>

const Template: ComponentStory<typeof ManageBookings> = (args) => (
  <ManageBookings {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
