import { MapLink } from '../../atoms/MapLink'
import { Reveal } from '../../molecules/Reveal'

import { StartEndDateCard } from '../DateCard/DateCard'
import { BookingsQuery } from '@autospace-org/network/src/generated'
import { AutoImageChanger } from '../../molecules/AutoImageChanger'
import { TitleStrongValue } from '../../atoms/TitleValue/TitleValue'

export interface IBookingCardProps {
  booking: NonNullable<BookingsQuery['bookings']>[number]
}

export const CustomerBookingCard = ({ booking }: IBookingCardProps) => {
  return (
    <div className="bg-white ">
      <AutoImageChanger
        images={booking.slot.garage.images || []}
        durationPerImage={5}
      />
      <div className="p-4 ">
        <StartEndDateCard
          startTime={booking.startTime}
          endTime={booking.endTime}
        />
      </div>

      <div className="flex flex-col items-start gap-2 p-4 ">
        <TitleStrongValue title={'Vehicle number'}>
          {booking.vehicleNumber}
        </TitleStrongValue>
        <TitleStrongValue title={'Status'}>
          {booking.status.split('_').join(' ')}
        </TitleStrongValue>
        <TitleStrongValue title={'Slot ID'}>
          {booking.slot.displayName}
        </TitleStrongValue>
        <TitleStrongValue title={'Address'}>
          <div className="flex justify-between gap-2">
            <div>{booking.slot.garage.address.address}</div>
            <MapLink
              lat={booking.slot.garage.address.lat}
              lng={booking.slot.garage.address.lng}
            />
          </div>
        </TitleStrongValue>
        <TitleStrongValue title={'Code'}>
          <Reveal secret={booking.passcode || ''} />
        </TitleStrongValue>
      </div>
    </div>
  )
}
