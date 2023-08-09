import { useTakeSkip } from '@autospace-org/hooks/src/async'
import {
  BookingStatus,
  useValetPickupsQuery,
} from '@autospace-org/network/src/generated'
import { ShowData } from '../../organisms/ShowData'

import { PickupDropInfoCard } from '../../organisms/PickupDropInfoCard/PickupDropInfoCard'

export const ShowValetAllPickupTrips = () => {
  const { setSkip, setTake, skip, take } = useTakeSkip()
  const { loading, data } = useValetPickupsQuery({
    variables: { skip, take },
  })

  return (
    <ShowData
      loading={loading}
      pagination={{
        setSkip,
        setTake,
        skip,
        take,
        resultCount: data?.valetPickups.length,
        totalCount: undefined,
      }}
      title={'Pickups'}
    >
      {data?.valetPickups.map((booking) => (
        <PickupDropInfoCard
          targetStatus={BookingStatus.ValetAssignedForCheckIn}
          start={{
            lat:
              booking.valetAssignment?.pickupLat ||
              booking.slot.garage.address.lat,
            lng:
              booking.valetAssignment?.pickupLng ||
              booking.slot.garage.address.lng,
          }}
          end={booking.slot.garage.address}
          booking={{
            id: booking.id,
            time: booking.startTime,
          }}
          key={booking.id}
        />
      ))}
    </ShowData>
  )
}
