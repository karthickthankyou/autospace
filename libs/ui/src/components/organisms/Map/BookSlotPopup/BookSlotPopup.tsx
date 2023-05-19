import axios from 'axios'
import { Map } from '@autospace-org/ui/src/components/organisms/Map'

import { loadStripe } from '@stripe/stripe-js'
import { useTotalPrice } from '@autospace-org/hooks/src/useTotalPrice'

import { RadioGroup } from '@headlessui/react'
import {
  IconBike,
  IconCar,
  IconMotorbike,
  IconSquareRoundedNumber1,
  IconSquareRoundedNumber2,
  IconTir,
  IconUser,
} from '@tabler/icons-react'
import MapGL, { Source, Layer } from 'react-map-gl'

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
import { SearchBox } from '../../../templates/CreateGarage/CreateGarage'
import { CenterOfMap, DefaultZoomControls } from '../ZoomControls/ZoomControls'
import { Marker } from '../MapMarker'
import { ParkingIcon } from '../../../atoms/ParkingIcon'
import { getDistance } from '@autospace-org/util'
import { MarkerDragEvent } from 'react-map-gl'
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
    watch,
  } = useFormContext<FormTypeBookSlot>()

  useEffect(() => {
    if (dateRange?.startTime) setValue('startTime', dateRange.startTime)
    if (dateRange?.endTime) setValue('endTime', dateRange.endTime)
  }, [dateRange])

  const { startTime, endTime, type, valet } = watch()

  const totalPrice = useTotalPrice({
    pricePerHour: garage.availableSlots.find((slot) => slot.type === type)
      ?.pricePerHour,
    startTime,
    endTime,
    location: garage.address,
    valet: { pickup: valet?.pickupInfo, deliver: valet?.returnInfo },
  })

  useEffect(() => {
    console.log(getDistance(garage.address, valet?.pickupInfo))
  }, [garage.address, valet?.pickupInfo])

  const [showValet, setShowValet] = useState(false)
  const [differentLocations, setDifferentLocations] = useState(false)

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
        <div className="p-2 bg-gray-50">
          <HtmlLabel title="Need valet?">
            <Switch
              checked={showValet}
              onChange={(e) => setShowValet(e.target.checked)}
            />
          </HtmlLabel>
          {showValet ? (
            <div>
              <HtmlLabel title="Different pick up and deliver locations?">
                <Switch
                  checked={differentLocations}
                  onChange={(e) => setDifferentLocations(e.target.checked)}
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
                {showValet ? (
                  <MarkerWithDirection
                    sourceId="pickup_route"
                    destination={{
                      lat: valet?.pickupInfo?.lat,
                      lng: valet?.pickupInfo?.lng,
                    }}
                    origin={garage.address}
                    onDragEnd={({ lngLat }) => {
                      const { lat, lng } = lngLat
                      setValue('valet.pickupInfo.lat', lat || 0)
                      setValue('valet.pickupInfo.lng', lng || 0)
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <IconUser />
                      <span>
                        Pickup {!differentLocations ? '& deliver' : null}
                      </span>
                    </div>
                  </MarkerWithDirection>
                ) : null}

                {differentLocations ? (
                  <MarkerWithDirection
                    sourceId="deliver_route"
                    destination={{
                      lat: valet?.returnInfo?.lat,
                      lng: valet?.returnInfo?.lng,
                    }}
                    origin={garage.address}
                    onDragEnd={({ lngLat }) => {
                      const { lat, lng } = lngLat
                      setValue('valet.returnInfo.lat', lat || 0)
                      setValue('valet.returnInfo.lng', lng || 0)
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <IconUser />
                      <span>Deliver</span>
                    </div>
                  </MarkerWithDirection>
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
                    {differentLocations ? (
                      <CenterOfMap
                        Icon={IconUser}
                        onClick={(latLng) => {
                          const lat = parseFloat(latLng.lat.toFixed(6))
                          const lng = parseFloat(latLng.lng.toFixed(6))

                          setValue('valet.returnInfo.lat', lat, {
                            shouldValidate: true,
                          })
                          setValue('valet.returnInfo.lng', lng, {
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

export const MarkerWithDirection = ({
  destination,
  origin,
  onDragEnd,
  children,
  sourceId,
}: {
  origin: LatLng
  destination: Partial<LatLng>
  onDragEnd: (e: MarkerDragEvent) => void
  children: ReactNode
  sourceId: string
}) => {
  if (!destination.lng || !destination.lat) {
    return null
  }

  return (
    <>
      <Marker
        pitchAlignment="auto"
        longitude={destination.lng}
        latitude={destination.lat}
        draggable
        onDragEnd={onDragEnd}
      >
        {children}
      </Marker>
      <Directions
        sourceId={sourceId}
        origin={origin}
        destination={{ lat: destination.lat, lng: destination.lng }}
      />
    </>
  )
}

export const Directions = React.memo(
  ({
    origin: originRaw,
    destination: destinationRaw,
    sourceId,
  }: {
    origin: LatLng
    destination: LatLng
    sourceId: string
  }) => {
    const [coordinates, setCoordinates] = useState<LngLatTuple[]>([])

    const { origin, destination } = useDebouncedValue({
      origin: originRaw,
      destination: destinationRaw,
    })

    console.log('coordinates ', coordinates, origin, destination)

    useEffect(() => {
      ;(async () => {
        if (!origin || !destination) {
          setCoordinates([])
          return
        }

        const response = await fetch(
          // pk.eyJ1IjoiaWFta2FydGhpY2siLCJhIjoiY2t4b3AwNjZ0MGtkczJub2VqMDZ6OWNrYSJ9.-FMKkHQHvHUeDEvxz2RJWQ
          `https://api.mapbox.com/directions/v5/mapbox/walking/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&steps=true&overview=simplified`,
        )
        const data = await response.json()
        const coordinates =
          data?.routes[0]?.legs[0]?.steps.map(
            (step: { maneuver: { location: any } }) => step.maneuver.location,
          ) || []
        console.log('coordinates', coordinates)
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
