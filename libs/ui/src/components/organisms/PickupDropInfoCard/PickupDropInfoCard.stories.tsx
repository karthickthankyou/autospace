import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { PickupDropInfoCard } from './PickupDropInfoCard'

export default {
  title: 'src/components/organisms/PickupDropInfoCard',
  component: PickupDropInfoCard,
} as ComponentMeta<typeof PickupDropInfoCard>

const Template: ComponentStory<typeof PickupDropInfoCard> = (args) => (
  <PickupDropInfoCard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
