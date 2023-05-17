import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ManageAdmins } from './ManageAdmins'

export default {
  title: 'src/components/templates/ManageAdmins',
  component: ManageAdmins,
} as ComponentMeta<typeof ManageAdmins>

const Template: ComponentStory<typeof ManageAdmins> = (args) => (
  <ManageAdmins {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
