import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import { useTotalPrice } from '@autospace-org/hooks/src/useTotalPrice'

import { RadioGroup } from '@headlessui/react'
import { IconBike, IconCar, IconMotorbike, IconTir } from '@tabler/icons-react'

import {
  CreateBookingDocument,
  SearchGaragesQuery,
  SlotType,
  useCreateBookingMutation,
} from '@autospace-org/network/src/generated'
import { Button } from '../../../atoms/Button'
import { memo, useEffect } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import { DateRangeBookingInfo } from '../../../molecules/DateRangeBookingInfo'

import { HtmlLabel } from '../../../atoms/HtmlLabel'
import { HtmlInput } from '../../../atoms/HtmlInput'
import { Form } from '../../../atoms/Form'
import { FormTypeSearchGarage } from '@autospace-org/forms/src/searchGarages'
import { notification$ } from '@autospace-org/util/subjects'
import { useUserStore } from '@autospace-org/store/user'

const IconTypes = {
  [SlotType.Bicycle]: <IconBike />,
  [SlotType.Car]: <IconCar />,
  [SlotType.Bike]: <IconMotorbike />,
  [SlotType.Heavy]: <IconTir />,
}

const BookSlotPopup = memo(
  ({ garage }: { garage: SearchGaragesQuery['searchGarages'][0] }) => {
    const uid = useUserStore((state) => state.uid)

    const [createBooking, { loading }] = useCreateBookingMutation()

    const {
      control,
      register,
      handleSubmit,
      setValue,

      formState: { errors },
    } = useFormContext<FormTypeSearchGarage>()

    const { startTime, endTime, selectedType } =
      useWatch<FormTypeSearchGarage>()

    const totalPrice = useTotalPrice({
      slots: garage.availableSlots,
      type: selectedType,
      startTime,
      endTime,
    })

    useEffect(() => {
      // Todo: update slotid
      if (garage) setValue('garageId', +garage.id)
    }, [garage])

    return (
      <div className="flex gap-2 text-left border-t-2 border-white bg-white/50 backdrop-blur-sm">
        <Form
          onSubmit={handleSubmit(async (data) => {
            if (!uid) {
              notification$.next({ message: 'You are not logged in.' })
              return
            }
            if (!selectedType) {
              notification$.next({ message: 'Select the type.' })
              return
            }
            await createBooking({
              variables: {
                createBookingInput: {
                  customerId: uid,
                  endTime,
                  startTime,
                  type: selectedType,
                  garageId: data.garageId,
                  vehicleNumber: data.vehicleNumber,
                },
              },
            })
          })}
        >
          <div className="mb-2 font-bold">{garage.displayName}</div>
          <div className="mb-2">{garage.address.address}</div>

          <DateRangeBookingInfo />

          <div className="flex flex-wrap gap-2 mt-2">
            <HtmlLabel
              title="Slot type"
              error={errors.selectedType?.message?.toString()}
            >
              <Controller
                name="selectedType"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <RadioGroup
                      value={value}
                      onChange={onChange}
                      className="flex w-full gap-2"
                    >
                      {garage.availableSlots.map((slot) => (
                        <div
                          key={slot.type}
                          className="flex flex-wrap items-center gap-2 bg-white"
                        >
                          <RadioGroup.Option key={slot.type} value={slot.type}>
                            {({ checked }) => (
                              <div
                                className={`cursor-default border-2 p-2 ${
                                  checked
                                    ? 'border-yellow-500 shadow-md'
                                    : 'border-white'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  {slot.type ? IconTypes[slot.type] : null}
                                  <div>
                                    <span className="text-lg font-bold">
                                      {slot.pricePerHour}
                                    </span>
                                    /hr
                                  </div>
                                </div>

                                <div className="text-gray-600">
                                  {slot.count} open
                                </div>
                              </div>
                            )}
                          </RadioGroup.Option>
                        </div>
                      ))}
                    </RadioGroup>
                  )
                }}
              />
            </HtmlLabel>
          </div>
          <div className="mt-2 space-y-2">
            <HtmlLabel
              title="Vehicle number"
              error={errors.vehicleNumber?.message?.toString()}
            >
              <HtmlInput
                placeholder="KA01AB1234"
                {...register('vehicleNumber')}
              />
            </HtmlLabel>
            <HtmlLabel
              title="Phone number"
              error={errors.phoneNumber?.message?.toString()}
            >
              <HtmlInput
                placeholder="+910000000000"
                {...register('phoneNumber')}
              />
            </HtmlLabel>
          </div>
          <RadioGroup />
          {totalPrice ? (
            <div className="mt-4">
              <div className="text-lg font-bold">Rs. {totalPrice}</div>
            </div>
          ) : null}
          <Button
            type="submit"
            loading={loading}
            disabled={!totalPrice}
            className="w-full mt-2"
          >
            Book now
          </Button>
        </Form>
      </div>
    )
  },
)

export const createBookingSession = async (
  uid: string,
  redirectUrl: string,
  totalPrice: number,
) => {
  const checkoutSession = await axios.post('http://localhost:3000/stripe', {
    totalPrice,
    redirectUrl,
    uid,
  })

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

  const stripePromise = loadStripe(publishableKey || '')
  const stripe = await stripePromise
  const result = await stripe?.redirectToCheckout({
    sessionId: checkoutSession.data.sessionId,
  })

  return result
}

export { BookSlotPopup }
