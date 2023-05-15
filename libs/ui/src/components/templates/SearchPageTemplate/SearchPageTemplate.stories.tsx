import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SearchPageTemplate } from './SearchPageTemplate'
import { SlotType } from '@autospace-org/network/src/generated'

export default {
  title: 'components/templates/SearchPageTemplate',
  component: SearchPageTemplate,
} as ComponentMeta<typeof SearchPageTemplate>

const Template: ComponentStory<typeof SearchPageTemplate> = (args) => (
  <SearchPageTemplate />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
