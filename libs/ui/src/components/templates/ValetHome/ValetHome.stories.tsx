import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ValetHome } from './ValetHome'

export default {
  title: 'src/components/templates/ValetHome',
  component: ValetHome,
} as ComponentMeta<typeof ValetHome>

const Template: ComponentStory<typeof ValetHome> = (args) => (
  <ValetHome {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
