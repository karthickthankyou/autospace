import type { Meta, StoryObj } from '@storybook/react'
import { HeroSearchForm } from './HeroSearchForm'
import { useRouter } from 'next/router'

const meta: Meta<typeof HeroSearchForm> = {
  component: HeroSearchForm,
}
export default meta

type Story = StoryObj<typeof HeroSearchForm>

export const Primary: Story = {
  render: (args) => {
    const router = useRouter()
    return <HeroSearchForm router={router} />
  },
}
