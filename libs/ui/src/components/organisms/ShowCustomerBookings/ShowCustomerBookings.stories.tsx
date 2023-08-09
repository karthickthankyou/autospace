import type { Meta, StoryObj } from '@storybook/react'
import { ShowCustomerBookings } from './ShowCustomerBookings'

const meta: Meta<typeof ShowCustomerBookings> = {
  component: ShowCustomerBookings,
}
export default meta

type Story = StoryObj<typeof ShowCustomerBookings>

export const Primary: Story = {}
