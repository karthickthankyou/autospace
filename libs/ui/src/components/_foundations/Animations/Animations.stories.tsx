import type { Meta, StoryObj } from '@storybook/react'
import Animations from './Animations'

const meta: Meta<typeof Animations> = {
  component: Animations,
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="flex items-center justify-center h-64 max-w-md p-6 font-serif text-white border border-white rounded shadow-xl w-128 shadow-black/20 bg-primary-900">
          {Story()}
        </div>
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Animations>

export const Pulse: Story = {
  args: {
    className: 'animate-pulse ',
    children: 'Hello World',
  },
}

export const Spin: Story = {
  args: {
    className: 'animate-spin',
    children: 'Hello World',
  },
}
export const SpinSlow: Story = {
  args: {
    className: 'animate-spin-slow',
    children: 'Hello World',
  },
}
export const SpinReverse: Story = {
  args: {
    className: 'animate-spin-reverse',
    children: 'Hello World',
  },
}
export const Bounce: Story = {
  args: {
    className: 'animate-bounce',
    children: 'Hello World',
  },
}
export const Wiggle: Story = {
  args: {
    className: 'animate-wiggle',
    children: 'Hello World',
  },
}
export const Ping: Story = {
  args: {
    className: 'animate-ping',
    children: 'Hello World',
  },
}
export const Slide: Story = {
  args: {
    className: 'animate-slide',
    children: 'Hello World >',
  },
}
export const SlideLeft: Story = {
  args: {
    className: 'animate-slide-left',
    children: '< Hello World',
  },
}
export const Breathe: Story = {
  args: {
    className: 'animate-breathe',
    children: 'Hello World',
  },
}
