import { IconArrowDownTail, IconArrowRightCircle } from '@tabler/icons-react'
import { MapLink } from '../../atoms/MapLink'
import { Reveal } from '../../molecules/Reveal'

import { StartEndDateCard } from '../DateCard/DateCard'
import { BookingsQuery } from '@autospace-org/network/src/generated'

export interface IBookingCardProps {
  booking: NonNullable<BookingsQuery['bookings']>[number]
}

export const CustomerBookingCard = ({ booking }: IBookingCardProps) => {
  return (
    <div className="p-2 border border-white shadow-lg">
      <StartEndDateCard
        startTime={booking.startTime}
        endTime={booking.endTime}
      />
      <div className="mt-2">{booking.slot.garage.address.address}</div>
      <div className="mt-2">{booking.vehicleNumber}</div>
      <Reveal secret={booking.passcode || ''} />
      <MapLink
        lat={booking.slot.garage.address.lat}
        lng={booking.slot.garage.address.lng}
      />
    </div>
  )
}
export const PastCustomerBookingCard = ({ booking }: IBookingCardProps) => {
  return (
    <div className="border border-white">
      <StartEndDateCard
        startTime={booking.startTime}
        endTime={booking.endTime}
      />
      <div className="mt-2">{booking.slot.garage.address.address}</div>
      <div className="mt-2">{booking.vehicleNumber}</div>
      <MapLink
        lat={booking.slot.garage.address.lat}
        lng={booking.slot.garage.address.lng}
      />
    </div>
  )
}
