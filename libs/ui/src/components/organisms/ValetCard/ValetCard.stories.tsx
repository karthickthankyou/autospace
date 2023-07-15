import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ValetCard } from './ValetCard'

export default {
  title: 'src/components/organisms/ValetCard',
  component: ValetCard,
} as ComponentMeta<typeof ValetCard>

const Template: ComponentStory<typeof ValetCard> = (args) => (
  <ValetCard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
