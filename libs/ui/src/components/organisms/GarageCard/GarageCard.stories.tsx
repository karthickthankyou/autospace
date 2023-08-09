import { garages } from '@autospace-org/network/src/data'
import type { Meta, StoryObj } from '@storybook/react'
import { GarageCard } from './GarageCard'

const meta: Meta<typeof GarageCard> = {
  component: GarageCard,
  decorators: [(Story) => <div className="w-full max-w-md">{Story()}</div>],
}
export default meta

type Story = StoryObj<typeof GarageCard>

export const Primary: Story = {
  args: {
    garage: garages.garages[0],
  },
}
