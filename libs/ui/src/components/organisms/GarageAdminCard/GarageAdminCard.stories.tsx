import { garages } from '@autospace-org/network/src/data'
import type { Meta, StoryObj } from '@storybook/react'
import { GarageAdminCard } from './GarageAdminCard'

const meta: Meta<typeof GarageAdminCard> = {
  component: GarageAdminCard,
}
export default meta

type Story = StoryObj<typeof GarageAdminCard>

export const Primary: Story = {
  args: {
    garage: garages.garages[0],
  },
}
