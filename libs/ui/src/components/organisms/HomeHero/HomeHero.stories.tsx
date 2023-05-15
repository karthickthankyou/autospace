import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { HomeHero } from './HomeHero'

export default {
  title: 'components/organisms/HomeHero',
  component: HomeHero,
} as ComponentMeta<typeof HomeHero>

const Template: ComponentStory<typeof HomeHero> = (args) => (
  <HomeHero {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
