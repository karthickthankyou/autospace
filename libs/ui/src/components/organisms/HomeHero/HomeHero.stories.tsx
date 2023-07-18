import type { Meta, StoryObj } from '@storybook/react'
import { HomeHero } from './HomeHero'

const meta: Meta<typeof HomeHero> = {
  component: HomeHero,
}
export default meta

type Story = StoryObj<typeof HomeHero>

export const Primary: Story = {
  args: {},
}
