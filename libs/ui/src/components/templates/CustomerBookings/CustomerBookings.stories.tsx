import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CustomerBookings } from './CustomerBookings'

export default {
  title: 'components/templates/CustomerBookings',
  component: CustomerBookings,
} as ComponentMeta<typeof CustomerBookings>

const Template: ComponentStory<typeof CustomerBookings> = (args) => (
  <CustomerBookings {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
