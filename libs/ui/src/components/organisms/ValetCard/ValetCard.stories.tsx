import { valets } from '@autospace-org/network/src/data'
import type { Meta, StoryObj } from '@storybook/react'
import { ValetCard } from './ValetCard'

const meta: Meta<typeof ValetCard> = {
  component: ValetCard,
}
export default meta

type Story = StoryObj<typeof ValetCard>

export const Primary: Story = {
  args: { valet: valets.valets[0] },
}
