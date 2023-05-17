import { IconArrowDownTail, IconArrowRightCircle } from '@tabler/icons-react'
import { MapLink } from '../../atoms/MapLink'
import { Reveal } from '../../molecules/Reveal'

import { StartEndDateCard } from '../DateCard/DateCard'
import { BookingsQuery } from '@autospace-org/network/src/generated'
import { AutoImageChanger } from '../../molecules/AutoImageChanger'

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
      <AutoImageChanger
        images={booking.slot.garage.images || []}
        durationPerImage={5}
      />
      <div className="flex items-center justify-between gap-1 p-4 mt-2 bg-topo">
        <div>{booking.slot.garage.address.address}</div>
        <MapLink
          lat={booking.slot.garage.address.lat}
          lng={booking.slot.garage.address.lng}
        />
      </div>
      <div className="flex flex-col items-center gap-1 p-4 ">
        <div className="text-sm">{booking.vehicleNumber}</div>
        <div className="text-sm">{booking.status}</div>
        <div className="px-1 font-semibold border border-black">
          {booking.slot.displayName}
        </div>
      </div>
      <div className="p-4 ">
        <Reveal secret={booking.passcode || ''} />
      </div>
    </div>
  )
}
