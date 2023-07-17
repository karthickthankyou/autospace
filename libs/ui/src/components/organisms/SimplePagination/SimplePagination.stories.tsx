import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SimplePagination } from './SimplePagination'

export default {
  title: 'src/components/organisms/SimplePagination',
  component: SimplePagination,
} as ComponentMeta<typeof SimplePagination>

const Template: ComponentStory<typeof SimplePagination> = (args) => (
  <SimplePagination {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
