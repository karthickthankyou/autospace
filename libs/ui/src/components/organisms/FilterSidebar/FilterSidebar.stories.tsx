import { FormProviderSearchGarage } from '@autospace-org/forms/src/searchGarages'
import type { Meta, StoryObj } from '@storybook/react'
import { FilterSidebar } from './FilterSidebar'

const meta: Meta<typeof FilterSidebar> = {
  component: FilterSidebar,
  decorators: [
    (Story) => <FormProviderSearchGarage>{Story()}</FormProviderSearchGarage>,
  ],
}
export default meta

type Story = StoryObj<typeof FilterSidebar>

export const Primary: Story = {
  args: {},
}
