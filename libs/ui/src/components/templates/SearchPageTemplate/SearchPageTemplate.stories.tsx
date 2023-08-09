import { FormProviderSearchGarage } from '@autospace-org/forms/src/searchGarages'
import type { Meta, StoryObj } from '@storybook/react'
import { SearchPageTemplate } from './SearchPageTemplate'

const meta: Meta<typeof SearchPageTemplate> = {
  component: SearchPageTemplate,
  decorators: [
    (Story) => <FormProviderSearchGarage>{Story()}</FormProviderSearchGarage>,
  ],
}
export default meta

type Story = StoryObj<typeof SearchPageTemplate>

export const Primary: Story = {}
