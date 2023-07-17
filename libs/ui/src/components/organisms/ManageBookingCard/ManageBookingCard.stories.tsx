import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ManageBookingCard } from './ManageBookingCard'

export default {
  title: 'src/components/organisms/ManageBookingCard',
  component: ManageBookingCard,
} as ComponentMeta<typeof ManageBookingCard>

const Template: ComponentStory<typeof ManageBookingCard> = (args) => (
  <ManageBookingCard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
