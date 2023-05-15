import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BookSlotPopup } from './BookSlotPopup'

export default {
  title: 'src/components/organisms/Map/BookSlotPopup',
  component: BookSlotPopup,
} as ComponentMeta<typeof BookSlotPopup>

const Template: ComponentStory<typeof BookSlotPopup> = (args) => (
  <BookSlotPopup {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
