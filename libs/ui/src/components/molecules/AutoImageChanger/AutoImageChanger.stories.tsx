import type { Meta, StoryObj } from '@storybook/react'
import { AutoImageChanger } from './AutoImageChanger'

const meta: Meta<typeof AutoImageChanger> = {
  component: AutoImageChanger,
}
export default meta

type Story = StoryObj<typeof AutoImageChanger>

export const Primary: Story = {
  args: {
    durationPerImage: 100,
    images: [
      'https://placehold.co/400',
      'https://placehold.co/300',
      'https://placehold.co/200',
      'https://placehold.co/100',
    ],
  },
}
