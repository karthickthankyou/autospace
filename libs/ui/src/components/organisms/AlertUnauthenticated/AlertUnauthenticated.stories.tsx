import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AlertUnauthenticated } from './AlertUnauthenticated'

export default {
  title: 'src/components/organisms/AlertUnauthenticated',
  component: AlertUnauthenticated,
} as ComponentMeta<typeof AlertUnauthenticated>

const Template: ComponentStory<typeof AlertUnauthenticated> = (args) => (
  <AlertUnauthenticated {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
