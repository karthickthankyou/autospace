import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CreateGarage } from './CreateGarage'

export default {
  title: 'src/components/templates/CreateGarage',
  component: CreateGarage,
} as ComponentMeta<typeof CreateGarage>

const Template: ComponentStory<typeof CreateGarage> = (args) => <CreateGarage />

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
