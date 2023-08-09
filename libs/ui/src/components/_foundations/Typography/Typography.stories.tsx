import type { Meta, StoryObj } from '@storybook/react'
import { RenderScale } from './Typography'

const meta: Meta<typeof RenderScale> = {
  component: RenderScale,
}

export default meta
type Story = StoryObj<typeof RenderScale>

export const FontSize: Story = {
  args: {
    title: 'Font size',
    input: [
      { title: 'text-xs' },
      { title: 'text-sm' },
      { title: 'text-base' },
      { title: 'text-lg' },
      { title: 'text-xl' },
      { title: 'text-2xl' },
      { title: 'text-3xl' },
      { title: 'text-4xl' },
      { title: 'text-5xl' },
      { title: 'text-6xl' },
      { title: 'text-7xl' },
      { title: 'text-8xl' },
      { title: 'text-9xl' },
    ],
  },
}
export const FontWeight: Story = {
  args: {
    title: 'Font weight',
    input: [
      { title: 'font-thin', size: '100' },
      { title: 'font-extralight', size: '200' },
      { title: 'font-light', size: '300' },
      { title: 'font-normal', size: '400' },
      { title: 'font-medium', size: '500' },
      { title: 'font-semibold', size: '600' },
      { title: 'font-bold', size: '700' },
      { title: 'font-extrabold', size: '800' },
      { title: 'font-black', size: '900' },
    ],
  },
}
export const LetterSpacing: Story = {
  args: {
    title: 'Letter Spacing',
    input: [
      { title: 'tracking-tighter' },
      { title: 'tracking-tight' },
      { title: 'tracking-normal' },
      { title: 'tracking-wide' },
      { title: 'tracking-wider' },
      { title: 'tracking-widest' },
    ],
  },
}
export const LetterHeight: Story = {
  args: {
    title: 'Letter Height',
    input: [
      { title: 'leading-no-gap' },
      { title: 'leading-extra-tight' },
      { title: 'leading-none' },
      { title: 'leading-tight' },
      { title: 'leading-snug' },
      { title: 'leading-normal' },
      { title: 'leading-relaxed' },
      { title: 'leading-loose' },
    ],
    display: (
      <div className="inline-block bg-gray-50">
        Hello World <br />
        Lorem ipsum dolor sit amet consectetur.
      </div>
    ),
  },
}

export const FontFamily: Story = {
  args: {
    title: 'Font family',
    input: [
      { title: 'font-sans' },
      { title: 'font-serif' },
      { title: 'font-mono' },
    ],
  },
}
