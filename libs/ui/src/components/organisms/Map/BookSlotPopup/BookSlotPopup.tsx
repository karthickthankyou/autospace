import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import { useTotalPrice } from '@autospace-org/hooks/src/useTotalPrice'

import { RadioGroup } from '@headlessui/react'
import { IconBike, IconCar, IconMotorbike, IconTir } from '@tabler/icons-react'

import {
  SearchGaragesQuery,
  SlotType,
  useCreateBookingMutation,
} from '@autospace-org/network/src/generated'
import { Button } from '../../../atoms/Button'
import { Controller } from 'react-hook-form'

import { DateRangeBookingInfo } from '../../../molecules/DateRangeBookingInfo'

import { HtmlLabel } from '../../../atoms/HtmlLabel'
import { HtmlInput } from '../../../atoms/HtmlInput'
import { Form } from '../../../atoms/Form'
import { userFormBookSlot } from '@autospace-org/forms/src/bookSlot'
import { notification$ } from '@autospace-org/util/subjects'
import { useUserStore } from '@autospace-org/store/user'
import { DateRange } from '@autospace-org/forms/src/util'
import { useEffect } from 'react'

const IconTypes = {
  [SlotType.Bicycle]: <IconBike />,
  [SlotType.Car]: <IconCar />,
  [SlotType.Bike]: <IconMotorbike />,
  [SlotType.Heavy]: <IconTir />,
}

const BookSlotPopup = ({
  garage,
  dateRange,
}: {
  garage: SearchGaragesQuery['searchGarages'][0]
  dateRange: Partial<DateRange>
}) => {
  const uid = useUserStore((state) => state.uid)

  const [createBooking, { loading, error }] = useCreateBookingMutation()

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = userFormBookSlot()

  useEffect(() => {
    if (dateRange?.startTime) setValue('startTime', dateRange.startTime)
    if (dateRange?.endTime) setValue('endTime', dateRange.endTime)
  }, [dateRange])

  const { startTime, endTime, type } = watch()

  const totalPrice = useTotalPrice({
    slots: garage.availableSlots,
    type,
    startTime,
    endTime,
  })

  return (
    <div className="flex gap-2 text-left border-t-2 border-white bg-white/50 backdrop-blur-sm">
      <Form
        onSubmit={handleSubmit(async (data) => {
          if (!uid) {
            notification$.next({ message: 'You are not logged in.' })
            return
          }
          if (!type) {
            notification$.next({ message: 'Select the type.' })
            return
          }

          try {
            const { errors } = await createBooking({
              variables: {
                createBookingInput: {
                  phoneNumber: data.phoneNumber,
                  customerId: uid,
                  endTime,
                  startTime,
                  type,
                  garageId: garage.id,
                  vehicleNumber: data.vehicleNumber,
                },
              },
            })
            if (errors?.length) {
              errors.map((error) =>
                notification$.next({ message: error.message }),
              )
            }
            const res = await createBookingSession(
              uid!,
              'http://localhost:3001',
              totalPrice,
            )
          } catch (error) {
            console.error(error)
          }
        })}
      >
        <div className="mb-2 text-lg font-bold">{garage.displayName}</div>
        <div className="mb-2">{garage.address.address}</div>

        <DateRangeBookingInfo startTime={startTime} endTime={endTime} />

        <div className="flex flex-wrap gap-2 mt-2">
          <HtmlLabel title="Slot type" error={errors.type?.message}>
            <Controller
              name="type"
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
                                  : 'border-gray-200'
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
        <div className="mt-2 space-y-2">
          <HtmlLabel
            title="Vehicle number"
            error={errors.vehicleNumber?.message}
          >
            <HtmlInput
              placeholder="KA01AB1234"
              {...register('vehicleNumber')}
            />
          </HtmlLabel>
          <HtmlLabel title="Phone number" error={errors.phoneNumber?.message}>
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
        <Button type="submit" loading={loading} className="w-full mt-2">
          Book now
        </Button>
      </Form>
    </div>
  )
}

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
