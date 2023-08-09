import { SlotType } from '@autospace-org/network/src/generated'
import type { Meta, StoryObj } from '@storybook/react'
import { RadioOptionsSelectParkingSlotType } from './SelectParkingSlotType'

const meta: Meta<typeof RadioOptionsSelectParkingSlotType> = {
  component: RadioOptionsSelectParkingSlotType,
}
export default meta

type Story = StoryObj<typeof RadioOptionsSelectParkingSlotType>

export const Primary: Story = {
  args: {
    availableSlots: [
      { count: 120, pricePerHour: 10, type: SlotType.Bicycle },
      { count: 30, pricePerHour: 20, type: SlotType.Bike },
      { count: 20, pricePerHour: 40, type: SlotType.Car },
      { count: 6, pricePerHour: 100, type: SlotType.Heavy },
    ],
  },
}
