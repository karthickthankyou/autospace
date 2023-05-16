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
    <div className="bg-white ">
      <div className="p-4 ">
        <StartEndDateCard
          startTime={booking.startTime}
          endTime={booking.endTime}
        />
      </div>
      <div className="flex items-center justify-between gap-1 p-4 mt-2 bg-topo">
        <div>{booking.slot.garage.address.address}</div>
        <MapLink
          lat={booking.slot.garage.address.lat}
          lng={booking.slot.garage.address.lng}
        />
      </div>
      <div className="p-4">
        <div className="mt-2">{booking.vehicleNumber}</div>
        <Reveal secret={booking.passcode || ''} />
      </div>
    </div>
  )
}
