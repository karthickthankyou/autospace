import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Directions } from './Directions'

export default {
  title: 'src/components/molecules/Directions',
  component: Directions,
} as ComponentMeta<typeof Directions>

const Template: ComponentStory<typeof Directions> = (args) => (
  <Directions {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
