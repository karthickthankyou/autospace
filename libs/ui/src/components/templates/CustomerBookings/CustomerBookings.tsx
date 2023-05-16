import { CustomerBookingCard } from '../../organisms/BookingCard/BookingCard'
import { useUserStore } from '@autospace-org/store/user'
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
        <Tab label={BookingType[BookingTypes.ONGOING].title} />
        <Tab label={BookingType[BookingTypes.PAST].title} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ShowBookings type={BookingTypes.UPCOMING} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ShowBookings type={BookingTypes.ONGOING} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ShowBookings type={BookingTypes.PAST} />
      </TabPanel>
    </>
  )
}

export enum BookingTypes {
  ONGOING = 'ONGOING',
  UPCOMING = 'UPCOMING',
  PAST = 'PAST',
}

const BookingType = {
  [BookingTypes.ONGOING]: {
    title: 'Ongoing bookings',
    where: {
      startTime: { lte: new Date().toISOString() },
      endTime: { gte: new Date().toISOString() },
    },
  },
  [BookingTypes.UPCOMING]: {
    title: 'Upcoming bookings',
    where: {
      startTime: { gt: new Date().toISOString() },
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
  const uid = useUserStore((state) => state.uid)

  const [skip, setSkip] = useState(0)
  const [take, setTake] = useState(12)

  const [getBookings, { loading, data }] = useBookingsLazyQuery()

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
        <CustomerBookingCard booking={booking} />
      ))}
    </ShowData>
  )
}
