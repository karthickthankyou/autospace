import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { HowItWorksCustomer } from './HowItWorksCustomer'

export default {
  title: 'src/components/templates/HowItWorksCustomer',
  component: HowItWorksCustomer,
} as ComponentMeta<typeof HowItWorksCustomer>

const Template: ComponentStory<typeof HowItWorksCustomer> = (args) => (
  <HowItWorksCustomer {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
