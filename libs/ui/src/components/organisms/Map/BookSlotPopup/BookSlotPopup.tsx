import axios from 'axios'
import { Map } from '@autospace-org/ui/src/components/organisms/Map'

import { loadStripe } from '@stripe/stripe-js'
import { useTotalPrice } from '@autospace-org/hooks/src/useTotalPrice'

import { RadioGroup } from '@headlessui/react'
import {
  IconBike,
  IconCar,
  IconMotorbike,
  IconTir,
  IconUser,
} from '@tabler/icons-react'
import { Source, Layer } from 'react-map-gl'

import { useFormContext, useWatch } from 'react-hook-form'

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
import { FormTypeBookSlot } from '@autospace-org/forms/src/bookSlot'
import { notification$ } from '@autospace-org/util/subjects'
import { useUserStore } from '@autospace-org/store/user'
import { DateRange } from '@autospace-org/forms/src/util'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { ShowImages } from '../../../molecules/ShowImages'
import { Switch } from '../../../atoms/Switch'
import { Panel } from '../Panel'
import { CenterOfMap, DefaultZoomControls } from '../ZoomControls/ZoomControls'
import { Marker } from '../MapMarker'
import { ParkingIcon } from '../../../atoms/ParkingIcon'
import { LatLng } from '@autospace-org/types'
import { useDebouncedValue } from '@autospace-org/hooks/src/async'
import { LngLatTuple } from '@autospace-org/store/map'
import React from 'react'

const IconTypes = {
  [SlotType.Bicycle]: <IconBike />,
  [SlotType.Car]: <IconCar />,
  [SlotType.Bike]: <IconMotorbike />,
  [SlotType.Heavy]: <IconTir />,
}

export const BookSlotPopup = ({
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
  } = useFormContext<FormTypeBookSlot>()

  useEffect(() => {
    if (dateRange?.startTime) setValue('startTime', dateRange.startTime)
    if (dateRange?.endTime) setValue('endTime', dateRange.endTime)
  }, [dateRange])

  const { startTime, endTime, type, valet } = useWatch<FormTypeBookSlot>()

  const [showValet, setShowValet] = useState(false)
  const [differentDropoffLocation, setDifferentDropoffLocation] =
    useState(false)

  const totalPrice = useTotalPrice({
    pricePerHour: garage.availableSlots.find((slot) => slot.type === type)
      ?.pricePerHour,
    startTime,
    endTime,
    location: garage.address,
    valet,
    differentDropoffLocation,
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
        <ShowImages images={garage.images || []} />
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
        <div className="p-2 space-y-3 bg-gray-50">
          <div className="text-xl font-bold">Valet</div>
          <HtmlLabel title="Need valet?">
            <p className="text-sm text-gray">
              Our valets will whisk your car away to its reserved spot and bring
              it back when you're ready. It's like magic, but with cars!
            </p>
            <Switch
              checked={showValet}
              onChange={(e) => {
                setShowValet(e.target.checked)
                console.log('e.target.checked ', e.target.checked)
                if (!e.target.checked) {
                  setValue('valet', undefined, {
                    shouldValidate: true,
                  })
                  setDifferentDropoffLocation(false)
                } else {
                  setValue('valet.pickupInfo', {
                    lat: garage.address.lat,
                    lng: garage.address.lng,
                  })
                  setValue('valet.dropoffInfo', undefined)
                }
              }}
            />
          </HtmlLabel>
          {showValet ? (
            <div>
              <HtmlLabel title="Add a different drop off location?">
                <p className="text-sm text-gray">
                  Want your car delivered somewhere else? No problem! Choose a
                  different drop-off point and we'll make sure your ride is
                  there waiting for you.
                </p>
                <Switch
                  checked={differentDropoffLocation}
                  onChange={(e) => {
                    setDifferentDropoffLocation(e.target.checked)
                    if (!e.target.checked) {
                      setValue('valet.dropoffInfo', undefined, {
                        shouldValidate: true,
                      })
                    } else {
                      setValue('valet.dropoffInfo', {
                        lat: garage.address.lat,
                        lng: garage.address.lng,
                      })
                    }
                  }}
                />
              </HtmlLabel>
              <Map
                initialViewState={{
                  latitude: garage.address.lat,
                  longitude: garage.address.lng,
                  zoom: 13,
                }}
                height="30vh"
              >
                <Marker
                  latitude={garage.address.lat}
                  longitude={garage.address.lng}
                >
                  <ParkingIcon />
                </Marker>
                {showValet &&
                valet?.pickupInfo?.lng &&
                valet?.pickupInfo?.lat ? (
                  <>
                    <Marker
                      pitchAlignment="auto"
                      longitude={valet?.pickupInfo?.lng}
                      latitude={valet?.pickupInfo?.lat}
                      draggable
                      onDragEnd={({ lngLat }) => {
                        const { lat, lng } = lngLat
                        setValue('valet.pickupInfo.lat', lat || 0)
                        setValue('valet.pickupInfo.lng', lng || 0)
                      }}
                    >
                      <div className="flex flex-col items-center">
                        <IconUser />
                        <span>
                          Pickup{' '}
                          {!differentDropoffLocation ? '& drop off' : null}
                        </span>
                      </div>
                    </Marker>
                    <Directions
                      sourceId={'pickup_route'}
                      origin={garage.address}
                      destination={{
                        lat: valet?.pickupInfo?.lat,
                        lng: valet?.pickupInfo?.lng,
                      }}
                      setDistance={(distance) => {
                        setValue('valet.pickupInfo.distance', distance)
                      }}
                    />
                  </>
                ) : null}

                {differentDropoffLocation &&
                valet?.dropoffInfo?.lng &&
                valet?.dropoffInfo?.lat ? (
                  <>
                    <Marker
                      pitchAlignment="auto"
                      longitude={valet?.dropoffInfo?.lng}
                      latitude={valet?.dropoffInfo?.lat}
                      draggable
                      onDragEnd={({ lngLat }) => {
                        const { lat, lng } = lngLat
                        setValue('valet.dropoffInfo.lat', lat || 0)
                        setValue('valet.dropoffInfo.lng', lng || 0)
                      }}
                    >
                      <div className="flex flex-col items-center">
                        <IconUser />
                        <span>Drop off</span>
                      </div>
                    </Marker>
                    <Directions
                      sourceId={'dropoff_route'}
                      origin={garage.address}
                      destination={{
                        lat: valet?.dropoffInfo?.lat,
                        lng: valet?.dropoffInfo?.lng,
                      }}
                      setDistance={(distance) => {
                        setValue('valet.dropoffInfo.distance', distance)
                      }}
                    />
                  </>
                ) : null}

                <Panel position="left-top">
                  <DefaultZoomControls>
                    <CenterOfMap
                      Icon={IconUser}
                      onClick={(latLng) => {
                        const lat = parseFloat(latLng.lat.toFixed(6))
                        const lng = parseFloat(latLng.lng.toFixed(6))

                        setValue('valet.pickupInfo.lat', lat, {
                          shouldValidate: true,
                        })
                        setValue('valet.pickupInfo.lng', lng, {
                          shouldValidate: true,
                        })
                      }}
                    />
                    {differentDropoffLocation ? (
                      <CenterOfMap
                        Icon={IconUser}
                        onClick={(latLng) => {
                          const lat = parseFloat(latLng.lat.toFixed(6))
                          const lng = parseFloat(latLng.lng.toFixed(6))

                          setValue('valet.dropoffInfo.lat', lat, {
                            shouldValidate: true,
                          })
                          setValue('valet.dropoffInfo.lng', lng, {
                            shouldValidate: true,
                          })
                        }}
                      />
                    ) : null}
                  </DefaultZoomControls>
                </Panel>
              </Map>
            </div>
          ) : null}
        </div>
        {totalPrice ? (
          <div className="mt-4">
            <CostTitleValue title="Parking" price={totalPrice.parkingCharge} />
            <CostTitleValue
              title="Valet Pickup"
              price={totalPrice.valetChargePickup}
            />
            <CostTitleValue
              title="Valet Dropoff"
              price={totalPrice.valetChargeDropoff}
            />
            <CostTitleValue
              title="Total"
              price={
                totalPrice.parkingCharge +
                totalPrice.valetChargePickup +
                totalPrice.valetChargeDropoff
              }
            />
          </div>
        ) : null}
        <Button type="submit" loading={loading} className="w-full mt-2">
          Book now
        </Button>
      </Form>
    </div>
  )
}

export const CostTitleValue = ({
  title,
  price,
}: {
  title: string
  price: ReactNode
}) => {
  if (!price) return null
  return (
    <div className="flex justify-between text-lg font-bold">
      <div>{title}</div> <div>Rs. {price}</div>
    </div>
  )
}

export const createBookingSession = async (
  uid: string,
  redirectUrl: string,
  totalPrice: {
    parkingCharge: number
    valetChargeDropoff: number
    valetChargePickup: number
  },
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

export const Directions = React.memo(
  ({
    origin: originRaw,
    destination: destinationRaw,
    sourceId,
    setDistance,
  }: {
    origin: LatLng
    destination: Partial<LatLng>
    sourceId: string
    setDistance: (distance?: number) => void
  }) => {
    const [coordinates, setCoordinates] = useState<LngLatTuple[]>([])

    const { origin, destination } = useDebouncedValue(
      {
        origin: originRaw,
        destination: destinationRaw,
      },
      200,
    )

    useEffect(() => {
      ;(async () => {
        if (!origin || !destination) {
          setCoordinates([])
          return
        }

        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/walking/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&steps=true&overview=simplified`,
        )
        const data = await response.json()
        const coordinates =
          data?.routes[0]?.legs[0]?.steps.map(
            (step: { maneuver: { location: any } }) => step.maneuver.location,
          ) || []
        setDistance(data.routes[0].distance || 0)
        setCoordinates(coordinates)
      })()
    }, [origin, destination])

    const dataOne = useMemo(
      () => ({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates,
        },
      }),
      [coordinates],
    )

    return (
      //   @ts-ignore
      <Source id={sourceId} type="geojson" data={dataOne}>
        <Layer
          id={sourceId}
          type="line"
          source="my-data"
          paint={{
            'line-color': 'rgb(0,0,0)',
            'line-width': 2,
          }}
        />
      </Source>
    )
  },
)
