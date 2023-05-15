import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ClientOnly } from './ClientOnly'

export default {
  title: 'src/components/molecules/ClientOnly',
  component: ClientOnly,
} as ComponentMeta<typeof ClientOnly>

const Template: ComponentStory<typeof ClientOnly> = (args) => (
  <ClientOnly {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
