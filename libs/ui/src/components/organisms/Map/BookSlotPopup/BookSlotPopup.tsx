import axios from 'axios'
import { Map } from '@autospace-org/ui/src/components/organisms/Map'

import { loadStripe } from '@stripe/stripe-js'

import { RadioGroup } from '@headlessui/react'
import {
  IconBike,
  IconCar,
  IconCircleMinus,
  IconCirclePlus,
  IconMotorbike,
  IconTir,
  IconUser,
} from '@tabler/icons-react'
import { Source, Layer } from 'react-map-gl'

import { useFormContext, useWatch } from 'react-hook-form'

import {
  CreateBookingInput,
  SearchGaragesQuery,
  SlotType,
  useCreateBookingMutation,
} from '@autospace-org/network/src/generated'
import { Button } from '../../../atoms/Button'
import { Controller } from 'react-hook-form'

import { DateRangeBookingInfo } from '../../../molecules/DateRangeBookingInfo'
import { useTotalPrice } from '@autospace-org/hooks/src/useTotalPrice'
import { HtmlLabel } from '../../../atoms/HtmlLabel'
import { HtmlInput } from '../../../atoms/HtmlInput'
import { Form } from '../../../atoms/Form'
import { FormTypeBookSlot } from '@autospace-org/forms/src/bookSlot'
import { notification$ } from '@autospace-org/util/subjects'
import { useUserStore } from '@autospace-org/store/user'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { ShowImages } from '../../../molecules/ShowImages'
import { Switch } from '../../../atoms/Switch'
import { Panel } from '../Panel'
import { CenterOfMap, DefaultZoomControls } from '../ZoomControls/ZoomControls'
import { Marker } from '../MapMarker'
import { ParkingIcon } from '../../../atoms/ParkingIcon'
import { LatLng, TotalPrice } from '@autospace-org/types'
import { useDebouncedValue } from '@autospace-org/hooks/src/async'
import { LngLatTuple } from '@autospace-org/store/map'
import React from 'react'
import { differenceInTime } from '@autospace-org/util/date'

const IconTypes = {
  [SlotType.Bicycle]: <IconBike />,
  [SlotType.Car]: <IconCar />,
  [SlotType.Bike]: <IconMotorbike />,
  [SlotType.Heavy]: <IconTir />,
}

export const BookSlotPopup = ({
  garage,
}: {
  garage: SearchGaragesQuery['searchGarages'][0]
}) => {
  const uid = useUserStore((state) => state.uid)

  const [createBooking, { loading }] = useCreateBookingMutation()

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useFormContext<FormTypeBookSlot>()

  const { startTime, endTime, type, valet } = useWatch<FormTypeBookSlot>()

  useEffect(() => {
    if (startTime) setValue('startTime', startTime)
    if (endTime) setValue('endTime', endTime)
  }, [startTime, endTime])

  const totalPriceObj = useTotalPrice({
    pricePerHour: garage.availableSlots.find((slot) => slot.type === type)
      ?.pricePerHour,
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
            const bookingData = {
              phoneNumber: data.phoneNumber,
              customerId: uid,
              endTime,
              startTime,
              type,
              garageId: garage.id,
              vehicleNumber: data.vehicleNumber,

              ...(data.valet?.pickupInfo && data.valet?.dropoffInfo
                ? {
                    valetAssignment: {
                      pickupLat: data.valet?.pickupInfo?.lat,
                      pickupLng: data.valet?.pickupInfo?.lng,
                      returnLat: data.valet?.dropoffInfo?.lat,
                      returnLng: data.valet?.dropoffInfo?.lng,
                    },
                  }
                : {}),
            }
            const res = await createBookingSession(
              uid!,
              totalPriceObj,
              bookingData,
            )
            if (res?.error) {
              notification$.next({ message: 'Booking failed.' })
              return
            }
          } catch (error) {
            console.error(error)
          }
        })}
      >
        <div className="mb-2 text-lg font-bold">{garage.displayName}</div>
        <div className="mb-2 text-2xl font-extralight">
          {garage.address.address}
        </div>
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
        <ManageValets garage={garage} />

        {totalPriceObj ? (
          <div className="mt-4">
            <CostTitleValue
              title="Parking"
              price={totalPriceObj.parkingCharge}
            />
            <CostTitleValue
              title="Valet Pickup"
              price={totalPriceObj.valetChargePickup}
            />
            <CostTitleValue
              title="Valet Dropoff"
              price={totalPriceObj.valetChargeDropoff}
            />
            <CostTitleValue
              title="Services"
              price={totalPriceObj.servicesCharge}
            />
            <CostTitleValue
              title="Total"
              price={
                totalPriceObj.parkingCharge +
                totalPriceObj.valetChargePickup +
                totalPriceObj.valetChargeDropoff +
                totalPriceObj.servicesCharge
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
  totalPriceObj: TotalPrice,
  bookingData: CreateBookingInput,
) => {
  const checkoutSession = await axios.post('http://localhost:3000/stripe', {
    totalPriceObj,
    uid,
    bookingData,
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
      1000,
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

export type GarageCarService = NonNullable<
  SearchGaragesQuery['searchGarages'][0]['services']
>[0]

// export const ManageServices = React.memo(
//   ({
//     services,
//     onChange,
//     parkingDuration,
//     setError,
//   }: {
//     services: GarageCarService[]
//     onChange: (services: GarageCarService[]) => void
//     setError: (error?: string) => void
//     parkingDuration: number
//   }) => {
//     const [selectedServices, setSelectedServices] = useState<number[]>([])
//     console.log('selectedServices ', selectedServices)

//     const handleToggle = (service: GarageCarService) => {
//       console.log('0')
//       if (selectedServices.includes(service.id)) {
//         console.log('1')
//         setSelectedServices(selectedServices.filter((i) => i !== service.id))
//       } else {
//         console.log('2')
//         setSelectedServices([...selectedServices, service.id])
//       }
//     }

//     useEffect(() => {
//       const filteredServices = services.filter((service) =>
//         selectedServices.includes(service.id),
//       )

//       onChange(filteredServices)
//     }, [selectedServices, services])

//     const totalServicesDuration = services
//       .filter((service) => selectedServices.includes(service.id))
//       .reduce((total, currentService) => total + currentService.duration, 0)

//     useEffect(() => {
//       if (parkingDuration < totalServicesDuration) {
//         setError('Insufficient parking duration.')
//       } else {
//         setError()
//       }
//     }, [parkingDuration, totalServicesDuration])

//     const isServiceDisabled = (service: GarageCarService) => {
//       return (
//         !selectedServices.includes(service.id) &&
//         totalServicesDuration + service.duration > parkingDuration
//       )
//     }

//     return (
//       <div className="flex flex-col gap-2">
//         {services?.map((service) => (
//           <div key={service.id} className="flex items-center gap-3">
//             <div className="flex-1">
//               <div className="font-bold">{service.name}</div>
//               <div className="text-sm text-gray">{service.description}</div>
//               {/* {isServiceDisabled(service) ? (
//               <div className="flex items-center gap-1 text-xs">
//                 <IconAlertCircle className="w-4 h-4" />{' '}
//                 <div>Increase your stay to enable this service.</div>
//               </div>
//             ) : null} */}
//             </div>
//             <div className="text-right">
//               <div className="font-bold">Rs. {service.price}</div>
//               <div className="text-sm text-gray">{service.duration} min</div>
//             </div>
//             <button
//               type="button"
//               className="p-2"
//               // disabled={isServiceDisabled(service)}
//               onClick={(e) => {
//                 // e.stopPropagation()
//                 handleToggle(service)
//               }}
//             >
//               {selectedServices?.includes(service.id) ? (
//                 <IconCircleMinus className="w-6 h-6 " />
//               ) : (
//                 <IconCirclePlus className="w-6 h-6 " />
//               )}
//             </button>
//           </div>
//         ))}
//       </div>
//     )
//   },
// )

export const ManageValets = React.memo(
  ({ garage }: { garage: SearchGaragesQuery['searchGarages'][number] }) => {
    const [showValet, setShowValet] = useState(false)

    const { setValue } = useFormContext<FormTypeBookSlot>()
    const { valet } = useWatch<FormTypeBookSlot>()

    return (
      <div className="p-2 space-y-3 bg-gray-25">
        <div className="text-xl font-bold">Valet</div>

        <p className="text-sm text-gray">
          Our valets will whisk your car away to its reserved spot and bring it
          back when you're ready. It's like magic, but with cars!
        </p>
        <Switch
          checked={showValet}
          onChange={(e) => {
            setShowValet(e)

            if (!e) {
              setValue('valet', undefined, {
                shouldValidate: true,
              })
              setValue('valet.differentLocations', false)
            } else {
              setValue('valet.pickupInfo', {
                lat: garage.address.lat,
                lng: garage.address.lng,
              })
              setValue('valet.dropoffInfo', {
                lat: garage.address.lat,
                lng: garage.address.lng,
              })
            }
          }}
          label={'Need valet?'}
        />

        {showValet ? (
          <div>
            <div className="mb-6 space-y-3">
              <p className="text-sm text-gray">
                Want your car delivered somewhere else? No problem! Choose a
                different drop-off point and we'll make sure your ride is there
                waiting for you.
              </p>
              <Switch
                checked={valet?.differentLocations || false}
                onChange={(e) => {
                  setValue('valet.differentLocations', e)
                  if (!e) {
                    setValue('valet.dropoffInfo', {
                      lat: valet?.pickupInfo?.lat || garage.address.lat,
                      lng: valet?.pickupInfo?.lng || garage.address.lat,
                    })
                  } else {
                    setValue('valet.dropoffInfo', {
                      lat: garage.address.lat,
                      lng: garage.address.lng,
                    })
                  }
                }}
                label={'Add a different drop off location?'}
              />
            </div>

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
              {valet?.pickupInfo?.lng && valet?.pickupInfo?.lat ? (
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
                      if (!valet.differentLocations) {
                        setValue('valet.dropoffInfo.lat', lat || 0)
                        setValue('valet.dropoffInfo.lng', lng || 0)
                      }
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <IconUser />
                      <span>
                        Pickup {!valet.differentLocations ? '& drop off' : null}
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

              {valet?.differentLocations &&
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
                  {valet?.differentLocations ? (
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
    )
  },
)
