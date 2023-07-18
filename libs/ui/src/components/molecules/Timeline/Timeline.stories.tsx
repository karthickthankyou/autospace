import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Timeline } from './Timeline'

export default {
  title: 'src/components/molecules/Timeline',
  component: Timeline,
} as ComponentMeta<typeof Timeline>

const Template: ComponentStory<typeof Timeline> = (args) => (
  <Timeline {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
