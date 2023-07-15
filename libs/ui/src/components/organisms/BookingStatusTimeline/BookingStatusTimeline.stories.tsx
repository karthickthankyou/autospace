import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BookingStatusTimeline } from './BookingStatusTimeline'

export default {
  title: 'src/components/organisms/BookingStatusTimeline',
  component: BookingStatusTimeline,
} as ComponentMeta<typeof BookingStatusTimeline>

const Template: ComponentStory<typeof BookingStatusTimeline> = (args) => (
  <BookingStatusTimeline {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
