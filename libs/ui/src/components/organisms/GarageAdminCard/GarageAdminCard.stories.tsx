import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { GarageAdminCard } from './GarageAdminCard'

export default {
  title: 'src/components/organisms/GarageAdminCard',
  component: GarageAdminCard,
} as ComponentMeta<typeof GarageAdminCard>

const Template: ComponentStory<typeof GarageAdminCard> = (args) => (
  <GarageAdminCard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
