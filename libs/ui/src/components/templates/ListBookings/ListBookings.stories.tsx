import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ListBookings } from './ListBookings'

export default {
  title: 'src/components/templates/ListBookings',
  component: ListBookings,
} as ComponentMeta<typeof ListBookings>

const Template: ComponentStory<typeof ListBookings> = (args) => (
  <ListBookings {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
