import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import {
  formDefaultValuesSearchGarages,
  FormTypeSearchGarage,
} from '@autospace-org/forms/src/searchGarages'
import { Button } from '../../atoms/Button'
import { FilterHeading } from '../../molecules/FilterHeading'
import { RangeSlider } from '../../molecules/RangeSlider'
import { IconTypes } from '../../molecules/SelectParkingSlotType/SelectParkingSlotType'

import { IconFilter } from '@tabler/icons-react'
import { Brand } from '../../atoms/Brand'
import { PulsingDot } from '../../atoms/Dot'
import { ToggleButtonGroup } from '../../molecules/ToggleButtonGroup'
import { ToggleButton } from '../../molecules/ToggleButtonGroup/ToggleButtonGroup'
import { Sidebar } from '../Sidebar'

export interface IFilterSidebarProps {}

export const FilterSidebar = () => {
  const [open, setOpen] = useState(false)

  const {
    control,
    reset,
    getValues,
    formState: { dirtyFields },
  } = useFormContext<FormTypeSearchGarage>()
  return (
    <>
      <Button
        variant="text"
        onClick={() => setOpen(true)}
        className=" hover:bg-gray-200"
      >
        <IconFilter className="stroke-1.5 " />
        {dirtyFields.length ? <PulsingDot /> : null}
      </Button>
      <Sidebar open={open} setOpen={setOpen}>
        <Sidebar.Header>
          <Brand shortForm />
        </Sidebar.Header>{' '}
        <Sidebar.Body className="flex flex-col items-start gap-3">
          <Controller
            name="type"
            control={control}
            render={({
              field: { value = [], onChange },
              fieldState: { isDirty },
              formState: { defaultValues, errors },
            }) => {
              return (
                <div>
                  <FilterHeading dirty={isDirty} title="Vehicle type" />
                  <ToggleButtonGroup
                    value={value}
                    onChange={(event, value) => {
                      onChange(value.sort())
                    }}
                    aria-label="text formatting"
                  >
                    {defaultValues?.type?.map((val) => {
                      if (!val) return null
                      return (
                        <ToggleButton
                          key={val}
                          value={val}
                          selected={value.includes(val)}
                        >
                          {IconTypes[val]}
                        </ToggleButton>
                      )
                    })}
                  </ToggleButtonGroup>
                </div>
              )
            }}
          />
          <Controller
            name="pricePerHour"
            control={control}
            render={({
              field: { value, onChange },
              fieldState: { isDirty },
              formState: { defaultValues },
            }) => {
              return (
                <div className="w-full">
                  <FilterHeading dirty={isDirty} title="Price per hour" />
                  <RangeSlider
                    min={defaultValues?.pricePerHour?.[0]}
                    max={defaultValues?.pricePerHour?.[1]}
                    // max={200}
                    value={value}
                    onChange={onChange}
                    valueLabelFormat={(sliderValue) =>
                      `Rs.${sliderValue.toLocaleString()}`
                    }
                    step={5}
                  />
                </div>
              )
            }}
          />
          <Controller
            name="width"
            control={control}
            render={({
              field: { value, onChange },
              fieldState: { isDirty },
              formState: { defaultValues },
            }) => {
              return (
                <div className="w-full">
                  <FilterHeading dirty={isDirty} title="Width" />
                  <RangeSlider
                    min={defaultValues?.width?.[0]}
                    max={defaultValues?.width?.[1]}
                    value={value}
                    onChange={onChange}
                    valueLabelFormat={(sliderValue) =>
                      `${sliderValue.toLocaleString()} ft`
                    }
                    step={2}
                  />
                </div>
              )
            }}
          />
          <Controller
            name="height"
            control={control}
            render={({
              field: { value, onChange },
              fieldState: { isDirty },
              formState: { defaultValues },
            }) => {
              return (
                <div className="w-full">
                  <FilterHeading dirty={isDirty} title="Height" />
                  <RangeSlider
                    min={defaultValues?.height?.[0]}
                    max={defaultValues?.height?.[1]}
                    value={value}
                    onChange={onChange}
                    valueLabelFormat={(sliderValue) =>
                      `${sliderValue.toLocaleString()} ft`
                    }
                    step={2}
                  />
                </div>
              )
            }}
          />
          <Controller
            name="length"
            control={control}
            render={({
              field: { value, onChange },
              fieldState: { isDirty },
              formState: { defaultValues },
            }) => {
              return (
                <div className="w-full">
                  <FilterHeading dirty={isDirty} title="Length" />
                  <RangeSlider
                    min={defaultValues?.length?.[0]}
                    max={defaultValues?.length?.[1]}
                    value={value}
                    onChange={onChange}
                    valueLabelFormat={(sliderValue) =>
                      `${sliderValue.toLocaleString()} ft`
                    }
                    step={5}
                  />
                </div>
              )
            }}
          />
        </Sidebar.Body>
        <Sidebar.Footer>
          <Button
            onClick={() =>
              reset({ ...getValues(), ...formDefaultValuesSearchGarages })
            }
          >
            Reset
          </Button>
        </Sidebar.Footer>
      </Sidebar>
    </>
  )
}
