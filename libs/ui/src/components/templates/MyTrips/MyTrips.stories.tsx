import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { MyTrips } from './MyTrips'

export default {
  title: 'src/components/templates/MyTrips',
  component: MyTrips,
} as ComponentMeta<typeof MyTrips>

const Template: ComponentStory<typeof MyTrips> = (args) => <MyTrips {...args} />

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
