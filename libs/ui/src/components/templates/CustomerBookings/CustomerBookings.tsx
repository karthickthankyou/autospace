import { useState } from 'react'
import { Tab, Tabs } from '../../molecules/Tabs'
import { TabPanel } from '../../molecules/Tabs/Tabs'
import { ShowCustomerBookings } from '../../organisms/ShowCustomerBookings'
import {
  BookingType,
  BookingTypes,
} from '../../organisms/ShowCustomerBookings/ShowCustomerBookings'

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
        <Tab label={BookingType[BookingTypes.ONGOING].title} />
        <Tab label={BookingType[BookingTypes.PAST].title} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ShowCustomerBookings type={BookingTypes.ONGOING} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ShowCustomerBookings type={BookingTypes.PAST} />
      </TabPanel>
    </>
  )
}
