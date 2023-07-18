import type { Meta, StoryObj } from '@storybook/react'
import Masonry from './Masonry2'

const meta: Meta<typeof Masonry> = {
  component: Masonry,
}
export default meta

type Story = StoryObj<typeof Masonry>

const children = [
  <div className="h-full p-3 rounded shadow-lg bg-red/30" key="1">
    Hello
  </div>,
  <div className="h-full p-3 rounded shadow-lg bg-green/30" key="2">
    Hello 2
  </div>,
  <div className="h-full p-3 rounded shadow-lg bg-red/30" key="3">
    Hello 3
  </div>,
  <div className="h-full p-3 rounded shadow-lg bg-red/30" key="4">
    Hello
  </div>,
  <div className="h-full p-3 rounded shadow-lg bg-green/30" key="5">
    Hello 2
  </div>,
  <div className="h-full p-3 rounded shadow-lg bg-red/30" key="6">
    Hello 3
  </div>,
  <div className="h-full p-3 rounded shadow-lg bg-red/30" key="7">
    Hello
  </div>,
  <div className="h-full p-3 rounded shadow-lg bg-green/30" key="8">
    Hello 2
  </div>,
  <div className="h-full p-3 rounded shadow-lg bg-red/30" key="9">
    Hello 3
  </div>,
  <div className="h-full p-3 rounded shadow-lg bg-green/30" key="10">
    Hello 2
  </div>,
]

export const TwoColumns: Story = {
  args: { gap: '4', columns: '2', shortOnes: [3], childrenLimit: 6, children },
}
export const ThreeColumns: Story = {
  args: {
    gap: '4',
    columns: '3',
    shortOnes: [1, 2, 5, 6, 9],
    childrenLimit: 6,
    children,
  },
}
export const FourColumns: Story = {
  args: {
    gap: '4',
    columns: '4',
    shortOnes: [1, 2, 5, 6, 9],
    childrenLimit: 8,
    children,
  },
}
