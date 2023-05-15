import { Controller } from 'react-hook-form'
import { Button } from '../../atoms/Button'
import { HtmlInput } from '../../atoms/HtmlInput'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { SearchPlaceBox } from '../SearchPlaceBox'
import { useRouter } from 'next/navigation'
import { stringify } from 'querystring'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { ToggleButton, dividerClasses } from '@mui/material'
import { useFormSearchGaragesHome } from '@autospace-org/forms/src/searchGaragesHome'
import { IconTypes } from '../../molecules/SelectParkingSlotType/SelectParkingSlotType'
import { NextRouter } from 'next/router'

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
        const { type, endTime, startTime, locationInfo } = data

        let queryString = stringify({
          type,
          endTime,
          startTime,
          placeName: locationInfo?.placeName,
          lat: locationInfo?.lat,
          lng: locationInfo?.lng,
        })
        router.push(`/search?${queryString}`)
      })}
    >
      <div className="flex flex-col gap-4 ">
        <div>
          <HtmlLabel
            title="Search location"
            error={errors.locationInfo?.message}
          >
            <SearchPlaceBox
              setLocationInfo={({ placeName, latLng }) => {
                setValue('locationInfo', {
                  placeName,
                  lat: latLng[0],
                  lng: latLng[1],
                })
              }}
            />
          </HtmlLabel>
        </div>

        <HtmlLabel title="Start time" error={errors.startTime?.message}>
          <HtmlInput
            type="datetime-local"
            className="w-full p-2 text-lg font-light"
            min={new Date().toISOString().slice(0, 16)}
            {...register('startTime')}
          />
        </HtmlLabel>
        <HtmlLabel title="End time" error={errors.endTime?.message}>
          <HtmlInput
            min={new Date().toISOString().slice(0, 16)}
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
                            root: 'rounded-none  hover:fill-black',
                            selected: 'border border-black bg-white',
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
