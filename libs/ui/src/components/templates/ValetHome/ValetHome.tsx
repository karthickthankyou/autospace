import { useTakeSkip } from '@autospace-org/hooks/src/async'
import {
  BookingStatus,
  useValetDropsQuery,
  useValetPickupsQuery,
} from '@autospace-org/network/src/generated'
import { useState } from 'react'
import { Container } from '../../atoms/Container'
import { Tab, Tabs } from '../../molecules/Tabs'
import { TabPanel } from '../../molecules/Tabs/Tabs'
import { ShowData } from '../../organisms/ShowData'

import { PickupDropInfoCard } from '../../organisms/PickupDropInfoCard/PickupDropInfoCard'
import { IsLoggedIn } from '../IsLoggedIn'

export interface IValetHomeProps {}

export const ValetHome = ({}: IValetHomeProps) => {
  const [value, setValue] = useState<0 | 1>(0)

  return (
    <Container>
      <IsLoggedIn>
        <Tabs
          value={value}
          onChange={(e, v) => setValue(v)}
          aria-label="bookings"
        >
          <Tab label={'Pickup'} />
          <Tab label={'Drop'} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <ShowPickups />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ShowDrops />
        </TabPanel>
      </IsLoggedIn>
    </Container>
  )
}

export const ShowPickups = () => {
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

export const ShowDrops = () => {
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
