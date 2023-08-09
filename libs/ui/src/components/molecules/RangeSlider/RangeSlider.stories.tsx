import type { Meta, StoryObj } from '@storybook/react'
import { Controller, useForm } from 'react-hook-form'
import { RangeSlider } from './RangeSlider'

const meta: Meta<typeof RangeSlider> = {
  component: RangeSlider,
}
export default meta

type Story = StoryObj<typeof RangeSlider>

export const Primary: Story = {
  args: {
    defaultValue: [0, 10],
    step: 1,
  },
  render: ({ defaultValue, step }) => {
    const { control } = useForm({
      defaultValues: {
        slider: defaultValue,
      },
    })

    return (
      <div className="px-12 mt-24">
        <Controller
          name="slider"
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange, value } }) => (
            <RangeSlider
              step={step}
              defaultValue={defaultValue}
              onChange={onChange}
              value={value}
            />
          )}
        />
      </div>
    )
  },
}

export const LabelFormat: Story = {
  args: {
    defaultValue: [0, 1000],
    step: 1,
  },
  render: ({ defaultValue, step }) => {
    const { control } = useForm({
      defaultValues: {
        slider: defaultValue,
      },
    })

    return (
      <div className="px-12 mt-24">
        <Controller
          name="slider"
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange, value } }) => (
            <RangeSlider
              step={step}
              onChange={onChange}
              value={value}
              defaultValue={defaultValue}
              valueLabelFormat={(sliderValue) =>
                `Rs.${sliderValue.toLocaleString()}`
              }
            />
          )}
        />
      </div>
    )
  },
}
