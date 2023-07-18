import type { Meta, StoryObj } from '@storybook/react'
import { DateRangeBookingInfo } from './DateRangeBookingInfo'

const meta: Meta<typeof DateRangeBookingInfo> = {
  component: DateRangeBookingInfo,
}
export default meta

type Story = StoryObj<typeof DateRangeBookingInfo>

export const Primary: Story = {
  args: {
    endTime: new Date('2023-09-12').toISOString(),
    startTime: new Date('2023-08-01').toISOString(),
  },
}
