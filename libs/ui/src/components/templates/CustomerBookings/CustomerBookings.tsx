import { CustomerBookingCard } from '../../organisms/BookingCard/BookingCard'
import { useAppSelector } from '@autospace-org/store'
import { selectUid } from '@autospace-org/store/user'

import {
  SortOrder,
  useBookingsLazyQuery,
} from '@autospace-org/network/src/generated'
import { useEffect, useState } from 'react'
import { ShowData } from '../../organisms/ShowData'
import { Tab, Tabs } from '../../molecules/Tabs'
import { TabPanel } from '../../molecules/Tabs/Tabs'

export interface ICustomerBookingsProps {}

export const CustomerBookings = ({}: ICustomerBookingsProps) => {
  const [value, setValue] = useState(0)

  return (
    <>
      <Tabs
        value={value}
        onChange={(e, v) => setValue(v)}
        aria-label="bookings"
      >
        <Tab label={BookingType[BookingTypes.UPCOMING].title} />
        <Tab label={BookingType[BookingTypes.PAST].title} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ShowBookings type={BookingTypes.UPCOMING} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ShowBookings type={BookingTypes.PAST} />
      </TabPanel>
    </>
  )
}

export enum BookingTypes {
  UPCOMING = 'UPCOMING',
  PAST = 'PAST',
}

const BookingType = {
  [BookingTypes.UPCOMING]: {
    title: 'Upcoming bookings',
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

export const ShowBookings = ({ type }: { type: BookingTypes }) => {
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
    >
      {data?.bookings.map((booking) => (
        <CustomerBookingCard key={booking.id} booking={booking} />
      ))}
    </ShowData>
  )
}
