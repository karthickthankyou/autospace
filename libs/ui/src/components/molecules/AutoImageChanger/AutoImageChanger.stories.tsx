import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AutoImageChanger } from './AutoImageChanger'

export default {
  title: 'src/components/molecules/AutoImageChanger',
  component: AutoImageChanger,
} as ComponentMeta<typeof AutoImageChanger>

const Template: ComponentStory<typeof AutoImageChanger> = (args) => (
  <AutoImageChanger {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
