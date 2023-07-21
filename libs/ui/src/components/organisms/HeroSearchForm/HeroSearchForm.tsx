import { Controller } from 'react-hook-form'
import { Button } from '../../atoms/Button'
import { HtmlInput } from '../../atoms/HtmlInput'
import { HtmlLabel } from '../../atoms/HtmlLabel'

import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { ToggleButton } from '@mui/material'
import { useFormSearchGaragesHome } from '@autospace-org/forms/src/searchGaragesHome'
import { IconTypes } from '../../molecules/SelectParkingSlotType/SelectParkingSlotType'
import { NextRouter } from 'next/router'
import { toLocalISOString } from '@autospace-org/util'

export interface IHeroSearchFormProps {
  router: NextRouter
}

export const HeroSearchForm = ({ router }: IHeroSearchFormProps) => {
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormSearchGaragesHome()

  return (
    <form
      onSubmit={handleSubmit((data) => {
        const { type, endTime, startTime } = data

        let queryString = new URLSearchParams({
          type: type.toString(),
          endTime,
          startTime,
        })
        router.push(`/search?${queryString}`)
      })}
    >
      <div className="flex flex-col gap-4 ">
        <HtmlLabel title="Start time" error={errors.startTime?.message}>
          <HtmlInput
            type="datetime-local"
            className="w-full p-2 text-lg font-light"
            min={toLocalISOString(new Date()).slice(0, 16)}
            {...register('startTime')}
          />
        </HtmlLabel>
        <HtmlLabel title="End time" error={errors.endTime?.message}>
          <HtmlInput
            min={toLocalISOString(new Date()).slice(0, 16)}
            type="datetime-local"
            className="w-full p-2 text-lg font-light"
            {...register('endTime')}
          />
        </HtmlLabel>

        <div>
          <Controller
            name="type"
            control={control}
            render={({
              field: { value = [], onChange },
              fieldState: { isDirty },
              formState: { defaultValues },
            }) => {
              return (
                <HtmlLabel title="Vehicle type">
                  <ToggleButtonGroup
                    value={value}
                    onChange={(event, value) => {
                      onChange(value)
                    }}
                    classes={{ root: 'block' }}
                    aria-label="text formatting"
                  >
                    {defaultValues?.type?.map((value) => {
                      if (!value) return
                      return (
                        <ToggleButton
                          disableRipple
                          disableTouchRipple
                          disableFocusRipple
                          classes={{
                            root: 'rounded-none  hover:fill-black bg-white',
                            selected: 'border border-black bg-white shadow-lg',
                          }}
                          key={value}
                          value={value}
                        >
                          {IconTypes[value]}
                        </ToggleButton>
                      )
                    })}
                  </ToggleButtonGroup>
                </HtmlLabel>
              )
            }}
          />
        </div>
        <Button
          size="lg"
          loading={isSubmitting}
          type="submit"
          className="w-full"
        >
          Search parking slots
        </Button>
      </div>
    </form>
  )
}
