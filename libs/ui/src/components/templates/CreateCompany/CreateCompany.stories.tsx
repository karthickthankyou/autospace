import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CreateCompany } from './CreateCompany'

export default {
  title: 'components/organisms/CreateCompany',
  component: CreateCompany,
} as ComponentMeta<typeof CreateCompany>

const Template: ComponentStory<typeof CreateCompany> = (args) => (
  <CreateCompany {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
