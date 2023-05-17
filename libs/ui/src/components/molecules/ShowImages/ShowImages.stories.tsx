import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ShowImages } from './ShowImages'

export default {
  title: 'src/components/molecules/ShowImages',
  component: ShowImages,
} as ComponentMeta<typeof ShowImages>

const Template: ComponentStory<typeof ShowImages> = (args) => (
  <ShowImages {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
