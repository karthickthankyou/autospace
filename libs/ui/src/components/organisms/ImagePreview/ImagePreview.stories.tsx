import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ImagePreview } from './ImagePreview'

export default {
  title: 'src/components/organisms/ImagePreview',
  component: ImagePreview,
} as ComponentMeta<typeof ImagePreview>

const Template: ComponentStory<typeof ImagePreview> = (args) => (
  <ImagePreview {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
