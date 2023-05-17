import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AdminCard } from './AdminCard'

export default {
  title: 'src/components/organisms/AdminCard',
  component: AdminCard,
} as ComponentMeta<typeof AdminCard>

const Template: ComponentStory<typeof AdminCard> = (args) => (
  <AdminCard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
