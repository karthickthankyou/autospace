import type { Meta, StoryObj } from '@storybook/react'
import { DateRangeBookingInfo } from './DateRangeBookingInfo'
import { toLocalISOString } from '@autospace-org/util'

const meta: Meta<typeof DateRangeBookingInfo> = {
  component: DateRangeBookingInfo,
}
export default meta

type Story = StoryObj<typeof DateRangeBookingInfo>

export const Primary: Story = {
  args: {
    endTime: toLocalISOString(new Date('2023-09-12')),
    startTime: toLocalISOString(new Date('2023-08-01')),
  },
}
