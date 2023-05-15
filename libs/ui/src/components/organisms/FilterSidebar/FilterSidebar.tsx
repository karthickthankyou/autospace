import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Brand } from '../../atoms/Brand'
import { Button } from '../../atoms/Button'
import { RangeSlider } from '../../molecules/RangeSlider'
import { FilterHeading } from '../../molecules/FilterHeading'
import { IconTypes } from '../../molecules/SelectParkingSlotType/SelectParkingSlotType'
import { Sidebar } from '../Sidebar'
import {
  FormTypeSearchGarage,
  formDefaultValuesSearchGarages,
} from '@autospace-org/forms/src/searchGarages'

export interface IFilterSidebarProps {}

export const FilterSidebar = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const { control, reset, getValues } = useFormContext<FormTypeSearchGarage>()
  return (
    <Sidebar open={open} setOpen={setOpen}>
      <Sidebar.Header>
        <Brand shortForm />
      </Sidebar.Header>
      <Sidebar.Body>
        <div className="flex flex-col items-start space-y-1">
          <Controller
            name="pricePerHour"
            control={control}
            render={({
              field: { value, onChange },
              fieldState: { isDirty },
              formState: { defaultValues },
            }) => {
              return (
                <>
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
                </>
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
                <>
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
                </>
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
                <>
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
                </>
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
                <>
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
                </>
              )
            }}
          />
          <Controller
            name="type"
            control={control}
            render={({
              field: { value = [], onChange },
              fieldState: { isDirty },
              formState: { defaultValues, errors },
            }) => {
              return (
                <>
                  <FilterHeading dirty={isDirty} title="Vehicle type" />

                  <ToggleButtonGroup
                    value={value}
                    onChange={(event, value) => {
                      onChange(value.sort())
                    }}
                    classes={{ root: 'block' }}
                    aria-label="text formatting"
                  >
                    {defaultValues?.type?.map((val) => {
                      if (!val) return null
                      return (
                        <ToggleButton
                          disableRipple
                          disableTouchRipple
                          disableFocusRipple
                          classes={{
                            root: 'rounded-none',
                            selected: 'border border-black',
                          }}
                          key={val}
                          value={val}
                          selected={value.includes(val)}
                        >
                          {IconTypes[val]}
                        </ToggleButton>
                      )
                    })}
                  </ToggleButtonGroup>
                </>
              )
            }}
          />
        </div>
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
  )
}
