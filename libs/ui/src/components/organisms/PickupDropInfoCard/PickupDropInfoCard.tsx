import { useMapboxDirections } from '@autospace-org/hooks/src/map'
import polyline from '@mapbox/polyline'

import {
  BookingStatus,
  namedOperations,
  useAssignValetForCheckInCheckOutMutation,
} from '@autospace-org/network/src/generated'
import { format } from 'date-fns'
import React, { ReactNode } from 'react'
import { LatLng } from '@autospace-org/types'
import { Button } from '../../atoms/Button'
import { TitleValue } from '../../atoms/TitleValue'
import { Reveal } from '../../molecules/Reveal'
import { TitleStrongValue } from '../../atoms/TitleValue/TitleValue'
import { MapLink } from '../../atoms/MapLink'
import { Directions } from '../../molecules/Directions'

export interface IPickupDropInfoCardProps {
  start: LatLng
  end: LatLng
  booking: {
    id: number
    time: string
  }
  targetStatus: BookingStatus
}

export interface IMyTripCardProps {
  booking: {
    id: number
    time: string
    vehicleNumber: string
    passcode?: string | null
    status?: BookingStatus
  }
  start: LatLng
  end: LatLng
  targetStatus: BookingStatus
}

export const VehicleNumber = ({ children }: { children: ReactNode }) => {
  return (
    <div className="inline-block p-1 mt-1 font-medium border border-black">
      {children}
    </div>
  )
}

export const SimpleDate = ({
  time,
  className,
}: {
  time: string
  className?: string
}) => {
  return (
    <div className={className}>
      <div className="text-xl font-medium">{format(new Date(time), 'p')}</div>
      <div className="text-xs text-gray">{format(new Date(time), 'PP')}</div>
    </div>
  )
}

export const MyTripCard = React.memo(
  ({ start, end, booking, targetStatus }: IMyTripCardProps) => {
    const { data, distance, loading, error } = useMapboxDirections(start, end)

    return (
      <div>
        <SimpleDate className="mb-2" time={booking.time} />
        <div key={booking.id} className="flex gap-2">
          <div className="space-y-2">
            <StaticMap
              start={start}
              end={end}
              coordinates={data}
              className="w-60 h-60"
            />

            <BookingStatusButton bookingId={booking.id} status={targetStatus}>
              {targetStatus === BookingStatus.ValetPickedUp ? 'Pickup' : 'Drop'}
            </BookingStatusButton>
          </div>
          <div className="flex flex-col gap-2">
            <TitleStrongValue title={'Distance'}>
              <div className="text-xl font-semibold">
                {((distance || 0) / 1000).toFixed(2)}Km
              </div>
            </TitleStrongValue>
            <TitleStrongValue title={'Vehicle number'}>
              <div className="text-xl font-semibold ">
                {booking.vehicleNumber}
              </div>
            </TitleStrongValue>
            <TitleStrongValue title={'Code'}>
              <Reveal secret={booking.passcode} showIntruction={false} />
            </TitleStrongValue>
            <TitleStrongValue title={'Directions'}>
              <Directions start={start} end={end} />
            </TitleStrongValue>
            <TitleStrongValue title={'Status'}>
              {booking.status}
            </TitleStrongValue>
          </div>
        </div>
      </div>
    )
  },
)

export const PickupDropInfoCard = React.memo(
  ({ start, end, booking, targetStatus }: IPickupDropInfoCardProps) => {
    const { data, distance, loading, error } = useMapboxDirections(start, end)

    return (
      <div key={booking.id} className="space-y-1">
        <StaticMap start={start} end={end} coordinates={data} />
        <div className="p-2 bg-white ">
          <div className="flex justify-between gap-2 ">
            <div>
              <div className="text-lg font-semibold">
                {format(new Date(booking.time), 'p')}
              </div>
              <div className="text-xs text-gray">
                {format(new Date(booking.time), 'PP')}
              </div>
            </div>
            <div className="font-medium">
              {((distance || 0) / 1000).toFixed(2)}Km
            </div>
          </div>
        </div>

        <BookingStatusButton bookingId={booking.id} status={targetStatus}>
          Accept
        </BookingStatusButton>
      </div>
    )
  },
)

export const BookingStatusButton = ({
  bookingId,
  status,
  children,
}: {
  bookingId: number
  status: BookingStatus
  children: ReactNode
}) => {
  const [assignPickup, { loading, data }] =
    useAssignValetForCheckInCheckOutMutation()
  return (
    <div>
      <Button
        fullWidth
        color="white"
        loading={loading}
        onClick={async () => {
          await assignPickup({
            variables: { bookingId, status },
            awaitRefetchQueries: true,
            refetchQueries: [
              namedOperations.Query.valetPickups,
              namedOperations.Query.valetDrops,
              namedOperations.Query.myDropTrips,
              namedOperations.Query.myPickupTrips,
            ],
          })
        }}
      >
        {children}
      </Button>
    </div>
  )
}

export const InfoCard = ({
  date,
  time,
  distance,
}: {
  date: string
  time: string
  ve: string
  distance: number
}) => {
  return (
    <div className="flex justify-between gap-2 p-2 bg-white">
      <div>
        <div>{time}</div>
        <div className="text-xs text-gray">{date}</div>
      </div>

      <div className="font-medium">{((distance || 0) / 1000).toFixed(2)}Km</div>
    </div>
  )
}

export const StaticMap = ({
  start,
  end,
  padding = [100, 100, 100],
  pitch = 45,
  coordinates,
  className = 'w-full shadow-xl aspect-square',
}: {
  start: { lng: number; lat: number }
  end: { lng: number; lat: number }
  padding?: [number, number, number]
  pitch?: number
  coordinates: [number, number][]
  className?: string
}) => {
  if (!coordinates.length) {
    return <div className="w-full bg-gray-100 shadow-xl aspect-square" />
  }

  const encodedPolyline = polyline.fromGeoJSON({
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates,
    },
    properties: {},
  })

  const boundingBox = [
    Math.min(start.lng, end.lng),
    Math.min(start.lat, end.lat),
    Math.max(start.lng, end.lng),
    Math.max(start.lat, end.lat),
  ].join(',')

  const paddingString = padding.join(',')

  const url = `https://api.mapbox.com/styles/v1/iamkarthick/clk4em1h900i201pf3jvuei21/static/pin-s-a+000(${
    start.lng
  },${start.lat}),pin-s-b+000(${end.lng},${
    end.lat
  }),path-2+000(${encodeURIComponent(
    encodedPolyline,
  )})/[${boundingBox}]/400x400?padding=${paddingString}&access_token=${
    process.env.NEXT_PUBLIC_MAPBOX_TOKEN
  }`

  return <img src={url} alt="Map" className={` ${className}`} />
}
