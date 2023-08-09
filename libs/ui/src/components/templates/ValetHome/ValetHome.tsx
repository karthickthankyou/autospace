import { useState } from 'react'
import { Container } from '../../atoms/Container'
import { Tab, Tabs } from '../../molecules/Tabs'
import { TabPanel } from '../../molecules/Tabs/Tabs'

import { ShowValetAllDropTrips } from '../../organisms/ShowValetAllDropTrips'
import { ShowValetAllPickupTrips } from '../../organisms/ShowValetAllPickupTrips'
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
          <ShowValetAllPickupTrips />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ShowValetAllDropTrips />
        </TabPanel>
      </IsLoggedIn>
    </Container>
  )
}
