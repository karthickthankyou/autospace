import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { GarageCard } from './GarageCard'

export default {
  title: 'src/components/organisms/GarageCard',
  component: GarageCard,
} as ComponentMeta<typeof GarageCard>

const Template: ComponentStory<typeof GarageCard> = (args) => (
  <GarageCard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
