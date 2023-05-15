import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { HeroSearchForm } from './HeroSearchForm'

export default {
  title: 'components/organisms/HeroSearchForm',
  component: HeroSearchForm,
} as ComponentMeta<typeof HeroSearchForm>

const Template: ComponentStory<typeof HeroSearchForm> = (args) => (
  <HeroSearchForm {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
