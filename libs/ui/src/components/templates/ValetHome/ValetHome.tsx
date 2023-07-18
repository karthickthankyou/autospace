import { useUserStore } from '@autospace-org/store/user'

import { LoaderPanel } from '../../molecules/Loader'
import { AlertSection } from '../../organisms/AlertSection'
import {
  BookingStatus,
  useValetDropsQuery,
  useValetPickupsQuery,
} from '@autospace-org/network/src/generated'
import { useState } from 'react'
import { Tab, Tabs } from '../../molecules/Tabs'
import { TabPanel } from '../../molecules/Tabs/Tabs'
import { Container } from '../../atoms/Container'
import { ShowData } from '../../organisms/ShowData'
import { useTakeSkip } from '@autospace-org/hooks/src/async'

import { PickupDropInfoCard } from '../../organisms/PickupDropInfoCard/PickupDropInfoCard'

export interface IValetHomeProps {}

export const ValetHome = ({}: IValetHomeProps) => {
  const { uid, loaded } = useUserStore((s) => ({
    uid: s.uid,
    loaded: s.loaded,
  }))
  const [value, setValue] = useState<0 | 1>(0)

  if (!loaded) {
    return <LoaderPanel />
  }

  if (!uid) {
    return <AlertSection>You are not logged in.</AlertSection>
  }

  return (
    <Container>
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
  console.log('data ', data)

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