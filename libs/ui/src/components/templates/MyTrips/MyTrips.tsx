import { useTakeSkip } from '@autospace-org/hooks/src/async'
import {
  BookingStatus,
  SortOrder,
  useMyDropTripsQuery,
  useMyPickupTripsQuery,
} from '@autospace-org/network/src/generated'
import { useAppSelector } from '@autospace-org/store'
import { selectUser } from '@autospace-org/store/user'
import { Timeline } from '../../molecules/Timeline'
import { TimelineItem } from '../../molecules/Timeline/Timeline'
import { MyTripCard } from '../../organisms/PickupDropInfoCard/PickupDropInfoCard'
import { ShowDataSimple } from '../../organisms/ShowData/ShowData'

export const MyTrips = () => {
  return (
    <div className="space-y-12">
      <ShowMyPickupTrips />
      <ShowMyDropTrips />
    </div>
  )
}

export const ShowMyPickupTrips = () => {
  const { setSkip, setTake, skip, take } = useTakeSkip()
  const { uid } = useAppSelector(selectUser)
  const { data, loading } = useMyPickupTripsQuery({
    variables: {
      orderBy: {
        startTime: SortOrder.Asc,
      },
      where: {
        status: {
          in: [BookingStatus.ValetAssignedForCheckIn],
        },
        valetAssignment: {
          is: {
            pickupValetId: { equals: uid },
          },
        },
      },
    },
  })

  return (
    <Timeline>
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
        className="flex flex-col gap-2"
      >
        {data?.bookings.map((booking) => (
          <TimelineItem key={booking.id} time={booking.startTime}>
            <MyTripCard
              booking={{
                id: booking.id,
                time: booking.startTime,
                vehicleNumber: booking.vehicleNumber,
                passcode: booking.passcode,
                status: booking.status,
              }}
              targetStatus={BookingStatus.ValetPickedUp}
              start={{
                lat:
                  booking.valetAssignment?.pickupLat ||
                  booking.slot.garage.address.lat,
                lng:
                  booking.valetAssignment?.pickupLng ||
                  booking.slot.garage.address.lng,
              }}
              end={booking.slot.garage.address}
            />
          </TimelineItem>
        ))}
      </ShowDataSimple>
    </Timeline>
  )
}

export const ShowMyDropTrips = () => {
  const { setSkip, setTake, skip, take } = useTakeSkip()
  const { uid } = useAppSelector(selectUser)

  const { data, loading } = useMyDropTripsQuery({
    variables: {
      orderBy: {
        endTime: SortOrder.Asc,
      },
      where: {
        status: {
          notIn: [
            BookingStatus.Booked,
            BookingStatus.CheckedIn,
            BookingStatus.ValetReturned,
          ],
        },
        valetAssignment: {
          is: { returnValetId: { equals: uid } },
        },
      },
    },
  })

  return (
    <Timeline>
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
        className="flex flex-col gap-2"
      >
        {data?.bookings.map((booking) => (
          <TimelineItem key={booking.id} time={booking.startTime}>
            <MyTripCard
              booking={{
                id: booking.id,
                time: booking.startTime,
                vehicleNumber: booking.vehicleNumber,
                passcode: booking.passcode,
                status: booking.status,
              }}
              targetStatus={BookingStatus.ValetReturned}
              end={{
                lat:
                  booking.valetAssignment?.returnLat ||
                  booking.slot.garage.address.lat,
                lng:
                  booking.valetAssignment?.returnLng ||
                  booking.slot.garage.address.lng,
              }}
              start={booking.slot.garage.address}
            />
          </TimelineItem>
        ))}
      </ShowDataSimple>
    </Timeline>
  )
}
