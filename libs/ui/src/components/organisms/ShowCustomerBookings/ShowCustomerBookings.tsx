import { useAppSelector } from '@autospace-org/store'
import { selectUid } from '@autospace-org/store/user'
import { CustomerBookingCard } from '../../organisms/BookingCard/BookingCard'

import {
  SortOrder,
  useBookingsLazyQuery,
} from '@autospace-org/network/src/generated'
import { useEffect, useState } from 'react'
import { Timeline } from '../../molecules/Timeline'
import { TimelineItem } from '../../molecules/Timeline/Timeline'
import { ShowData } from '../../organisms/ShowData'

export interface IShowCustomerBookingsProps {
  type: BookingTypes
}

export enum BookingTypes {
  ONGOING = 'ONGOING',
  PAST = 'PAST',
}

export const BookingType = {
  [BookingTypes.ONGOING]: {
    title: 'Ongoing bookings',
    where: {
      endTime: { gt: new Date().toISOString() },
    },
  },
  [BookingTypes.PAST]: {
    title: 'Past bookings',
    where: {
      endTime: { lt: new Date().toISOString() },
    },
  },
}

export const ShowCustomerBookings = ({ type }: IShowCustomerBookingsProps) => {
  const condition = BookingType[type]
  const uid = useAppSelector(selectUid)

  const [skip, setSkip] = useState(0)
  const [take, setTake] = useState(12)

  const [getBookings, { loading, data, error }] = useBookingsLazyQuery()

  useEffect(() => {
    if (uid)
      getBookings({
        variables: {
          skip,
          take,
          where: {
            customerId: { equals: uid },
            ...condition.where,
          },
          orderBy: {
            startTime: SortOrder.Asc,
          },
        },
      })
  }, [uid, getBookings])

  return (
    <Timeline>
      <ShowData
        error={error?.message}
        loading={loading}
        pagination={{
          skip,
          take,
          resultCount: data?.bookings.length,
          totalCount: data?.bookingsCount.count,
          setSkip,
          setTake,
        }}
        title={undefined}
        className="flex flex-col gap-2"
      >
        {data?.bookings.map((booking) => (
          <TimelineItem key={booking.id} time={booking.startTime}>
            <CustomerBookingCard booking={booking} />
          </TimelineItem>
        ))}
      </ShowData>
    </Timeline>
  )
}
