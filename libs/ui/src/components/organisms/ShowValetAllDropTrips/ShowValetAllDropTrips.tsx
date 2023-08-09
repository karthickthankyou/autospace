import { useTakeSkip } from '@autospace-org/hooks/src/async'
import {
  BookingStatus,
  useValetDropsQuery,
} from '@autospace-org/network/src/generated'
import { ShowData } from '../../organisms/ShowData'

import { PickupDropInfoCard } from '../../organisms/PickupDropInfoCard/PickupDropInfoCard'

export interface IShowValetAllDropTripsProps {}

export const ShowValetAllDropTrips = () => {
  const { setSkip, setTake, skip, take } = useTakeSkip()
  const { loading, data } = useValetDropsQuery({
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
        resultCount: data?.valetDrops.length,
        totalCount: undefined,
      }}
      title={'Drops'}
    >
      {data?.valetDrops.map((booking) => (
        <PickupDropInfoCard
          targetStatus={BookingStatus.ValetAssignedForCheckOut}
          key={booking.id}
          end={{
            lat:
              booking.valetAssignment?.returnLat ||
              booking.slot.garage.address.lat,
            lng:
              booking.valetAssignment?.returnLng ||
              booking.slot.garage.address.lng,
          }}
          start={booking.slot.garage.address}
          booking={{
            id: booking.id,
            time: booking.endTime,
          }}
        />
      ))}
    </ShowData>
  )
}
