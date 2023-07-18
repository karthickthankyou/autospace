import type { Meta, StoryObj } from '@storybook/react'
import { AdminCard } from './AdminCard'

const meta: Meta<typeof AdminCard> = {
  component: AdminCard,
}
export default meta

type Story = StoryObj<typeof AdminCard>

export const Primary: Story = {
  args: {
    admin: {
      uid: 'UJnS6H9YdWPS4pHnNqY3iDjvKni1',
      createdAt: new Date(),
      updatedAt: new Date(),
      verificationsCount: 2,
    },
  },
}
