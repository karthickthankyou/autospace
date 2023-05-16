import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CustomerBookingCard } from './BookingCard'

export default {
  title: 'components/organisms/BookingCard',
  component: CustomerBookingCard,
} as ComponentMeta<typeof CustomerBookingCard>

const Template: ComponentStory<typeof CustomerBookingCard> = (args) => (
  <CustomerBookingCard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
