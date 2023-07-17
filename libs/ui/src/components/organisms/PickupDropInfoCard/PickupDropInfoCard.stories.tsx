import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DropInfoCard } from './PickupDropInfoCard'

export default {
  title: 'src/components/organisms/PickupDropInfoCard',
  component: DropInfoCard,
} as ComponentMeta<typeof DropInfoCard>

const Template: ComponentStory<typeof DropInfoCard> = (args) => (
  <DropInfoCard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
