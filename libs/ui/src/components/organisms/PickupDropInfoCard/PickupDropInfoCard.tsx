import { useMapboxDirections } from '@autospace-org/hooks/src/map'
import polyline from '@mapbox/polyline'

import {
  BookingStatus,
  MyDropTripsQuery,
  MyPickupTripsQuery,
  ValetDropsQuery,
  ValetPickupsQuery,
  namedOperations,
  useAssignValetForCheckInCheckOutMutation,
} from '@autospace-org/network/src/generated'
import { format } from 'date-fns'
import React, { ReactNode, useMemo } from 'react'
import { LatLng } from '@autospace-org/types'
import { PlainButton } from '../../atoms/PlainButton'
import { Button } from '../../atoms/Button'

export interface IPickupInfoCardProps {
  pickup: ValetPickupsQuery['valetPickups'][0]
  parkingAddress: LatLng
}

export interface IDropInfoCardProps {
  drop: ValetDropsQuery['valetDrops'][0]
  parkingAddress: LatLng
}

export interface IMyTripPickupCardProps {
  pickup: MyPickupTripsQuery['bookings'][0]
  parkingAddress: LatLng
}

export interface IMyTripDropCardProps {
  drop: MyDropTripsQuery['bookings'][0]
  parkingAddress: LatLng
}

export const MyTripPickupCard = React.memo(
  ({ pickup }: IMyTripPickupCardProps) => {
    const start = useMemo(
      () => ({
        lat: pickup.valetAssignment.pickupLat,
        lng: pickup.valetAssignment.pickupLng,
      }),
      [pickup.valetAssignment],
    )
    const end = useMemo(() => pickup.slot.garage.address, [pickup.slot])
    const { data, distance, loading, error } = useMapboxDirections(start, end)

    return (
      <div key={pickup.id}>
        <StaticMap start={start} end={end} coordinates={data} />

        <InfoCard
          date={format(new Date(pickup.startTime), 'PP')}
          time={format(new Date(pickup.startTime), 'p')}
          distance={distance || 0}
        />
        <div className="flex items-center justify-between gap-2">
          <VehicleNumber>{pickup.vehicleNumber}</VehicleNumber>
          <BookingStatusButton
            bookingId={pickup.id}
            status={BookingStatus.ValetPickedUp}
          >
            Pickup
          </BookingStatusButton>
        </div>
      </div>
    )
  },
)

export const VehicleNumber = ({ children }: { children: ReactNode }) => {
  return (
    <div className="inline-block p-1 mt-1 font-medium border border-black">
      {children}
    </div>
  )
}

export const MyTripDropCard = React.memo(
  ({ drop, parkingAddress }: IMyTripDropCardProps) => {
    const start = useMemo(
      () => ({
        lat: drop.valetAssignment.returnLat || parkingAddress.lat,
        lng: drop.valetAssignment.returnLng || parkingAddress.lng,
      }),
      [drop.valetAssignment],
    )
    const end = useMemo(() => drop.slot.garage.address, [drop.slot])
    const { data, distance, loading, error } = useMapboxDirections(start, end)

    return (
      <div key={drop.id}>
        <StaticMap start={start} end={end} coordinates={data} />
        <InfoCard
          date={format(new Date(drop.startTime), 'PP')}
          time={format(new Date(drop.startTime), 'p')}
          distance={distance || 0}
        />
        <div className="flex items-center justify-between gap-2">
          <VehicleNumber>{drop.vehicleNumber}</VehicleNumber>
          <BookingStatusButton
            bookingId={drop.id}
            status={BookingStatus.ValetReturned}
          >
            Drop
          </BookingStatusButton>
        </div>
      </div>
    )
  },
)

export const PickupInfoCard = React.memo(
  ({ pickup, parkingAddress }: IPickupInfoCardProps) => {
    const start = useMemo(
      () => ({
        lat: pickup.valetAssignment.pickupLat,
        lng: pickup.valetAssignment.pickupLng,
      }),
      [pickup.valetAssignment],
    )
    const end = useMemo(() => pickup.slot.garage.address, [pickup.slot])
    const { data, distance, loading, error } = useMapboxDirections(start, end)

    return (
      <div key={pickup.id}>
        <StaticMap start={start} end={end} coordinates={data} />
        <InfoCard
          date={format(new Date(pickup.startTime), 'PP')}
          time={format(new Date(pickup.startTime), 'p')}
          distance={distance || 0}
        />
        <BookingStatusButton
          bookingId={pickup.id}
          status={BookingStatus.ValetAssignedForCheckIn}
        >
          Accept
        </BookingStatusButton>
      </div>
    )
  },
)

export const DropInfoCard = React.memo(
  ({ drop, parkingAddress }: IDropInfoCardProps) => {
    const start = useMemo(
      () => ({
        lat: drop.valetAssignment.returnLat || parkingAddress.lat,
        lng: drop.valetAssignment.returnLng || parkingAddress.lng,
      }),
      [drop.valetAssignment],
    )
    const end = useMemo(() => drop.slot.garage.address, [drop.slot])

    const { data, distance, loading, error } = useMapboxDirections(start, end)

    return (
      <div key={drop.id} className="space-y-2">
        <StaticMap start={start} end={end} coordinates={data} />
        <InfoCard
          date={format(new Date(drop.startTime), 'PP')}
          time={format(new Date(drop.startTime), 'p')}
          distance={distance || 0}
        />
        <BookingStatusButton
          bookingId={drop.id}
          status={BookingStatus.ValetAssignedForCheckOut}
        >
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
}: {
  start: { lng: number; lat: number }
  end: { lng: number; lat: number }
  padding?: [number, number, number]
  pitch?: number
  coordinates: [number, number][]
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

  return <img src={url} alt="Map" className="w-full shadow-xl aspect-square" />
}
