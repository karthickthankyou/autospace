import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { RadioOptionsSelectParkingSlotType } from './SelectParkingSlotType'

export default {
  title: 'components/molecules/SelectParkingSlotType',
  component: RadioOptionsSelectParkingSlotType,
} as ComponentMeta<typeof RadioOptionsSelectParkingSlotType>

const Template: ComponentStory<typeof RadioOptionsSelectParkingSlotType> = (
  args,
) => <RadioOptionsSelectParkingSlotType {...args} />

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
