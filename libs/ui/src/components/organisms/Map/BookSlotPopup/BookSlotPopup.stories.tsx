import type { Meta, StoryObj } from '@storybook/react'
import { BookSlotPopup } from './BookSlotPopup'
import { searchGarages } from '@autospace-org/network/src/data'
import { FormProviderBookSlot } from '@autospace-org/forms/src/bookSlot'

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
