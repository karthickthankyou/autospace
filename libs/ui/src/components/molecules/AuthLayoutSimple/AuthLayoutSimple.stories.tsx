import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AuthLayoutSimple } from './AuthLayoutSimple'

export default {
  title: 'molecules/AuthLayoutSimple',
  component: AuthLayoutSimple,
} as ComponentMeta<typeof AuthLayoutSimple>

const Template: ComponentStory<typeof AuthLayoutSimple> = (args) => (
  <AuthLayoutSimple {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
