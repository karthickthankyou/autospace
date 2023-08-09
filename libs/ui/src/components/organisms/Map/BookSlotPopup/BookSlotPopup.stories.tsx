import { FormProviderBookSlot } from '@autospace-org/forms/src/bookSlot'
import { searchGarages } from '@autospace-org/network/src/data'
import type { Meta, StoryObj } from '@storybook/react'
import { BookSlotPopup } from './BookSlotPopup'

const meta: Meta<typeof BookSlotPopup> = {
  component: BookSlotPopup,
  decorators: [
    (Story) => <FormProviderBookSlot>{Story()}</FormProviderBookSlot>,
  ],
}
export default meta

type Story = StoryObj<typeof BookSlotPopup>

export const Primary: Story = {
  args: { garage: searchGarages.searchGarages[0] },
}
