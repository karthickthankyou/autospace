import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DateCard } from './DateCard'

export default {
  title: 'components/organisms/DateCard',
  component: DateCard,
} as ComponentMeta<typeof DateCard>

const Template: ComponentStory<typeof DateCard> = (args) => (
  <DateCard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
