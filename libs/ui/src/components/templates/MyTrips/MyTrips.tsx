import {
  BookingStatus,
  useMyDropTripsQuery,
  useMyPickupTripsQuery,
} from '@autospace-org/network/src/generated'
import { useTakeSkip } from '@autospace-org/hooks/src/async'
import {
  MyTripDropCard,
  MyTripPickupCard,
} from '../../organisms/PickupDropInfoCard/PickupDropInfoCard'
import { ShowDataSimple } from '../../organisms/ShowData/ShowData'

export interface IMyTripsProps {
  uid: string
}

export const MyTrips = ({ uid }: IMyTripsProps) => {
  const { data, loading } = useMyPickupTripsQuery({
    variables: {
      where: {
        valetAssignment: {
          is: {
            OR: [
              { pickupValetId: { equals: uid } },
              { returnValetId: { equals: uid } },
            ],
          },
        },
      },
    },
  })
  return (
    <div className="space-y-12">
      <ShowMyPickupTrips uid={uid} />
      <ShowMyDropTrips uid={uid} />
    </div>
  )
}

export const ShowMyPickupTrips = ({ uid }: { uid: string }) => {
  const { setSkip, setTake, skip, take } = useTakeSkip()
  const { data, loading } = useMyPickupTripsQuery({
    variables: {
      where: {
        status: { equals: BookingStatus.ValetAssignedForCheckIn },
        valetAssignment: {
          is: {
            pickupValetId: { equals: uid },
          },
        },
      },
    },
  })

  return (
    <ShowDataSimple
      loading={loading}
      pagination={{
        setSkip,
        setTake,
        skip,
        take,
        resultCount: data?.bookings.length || 0,
      }}
      title={'My Pickups'}
    >
      {data?.bookings.map((booking) => (
        <MyTripPickupCard
          pickup={booking}
          key={booking.id}
          parkingAddress={booking.slot.garage.address}
        />
      ))}
    </ShowDataSimple>
  )
}

export const ShowMyDropTrips = ({ uid }: { uid: string }) => {
  const { setSkip, setTake, skip, take } = useTakeSkip()
  const { data, loading } = useMyDropTripsQuery({
    variables: {
      where: {
        status: { equals: BookingStatus.ValetAssignedForCheckOut },
        valetAssignment: {
          is: { returnValetId: { equals: uid } },
        },
      },
    },
  })

  return (
    <ShowDataSimple
      loading={loading}
      pagination={{
        setSkip,
        setTake,
        skip,
        take,
        resultCount: data?.bookings.length || 0,
      }}
      title={'My Drops'}
    >
      {data?.bookings.map((booking) => (
        <MyTripDropCard
          drop={booking}
          key={booking.id}
          parkingAddress={booking.slot.garage.address}
        />
      ))}
    </ShowDataSimple>
  )
}
