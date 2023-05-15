import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DateRangeBookingInfo } from './DateRangeBookingInfo'

export default {
  title: 'components/molecules/DateRangeBookingInfo',
  component: DateRangeBookingInfo,
} as ComponentMeta<typeof DateRangeBookingInfo>

const Template: ComponentStory<typeof DateRangeBookingInfo> = (args) => (
  <DateRangeBookingInfo {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
