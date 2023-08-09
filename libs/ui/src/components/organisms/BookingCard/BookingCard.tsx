import { MapLink } from '../../atoms/MapLink'
import { Reveal } from '../../molecules/Reveal'

import { BookingsQuery } from '@autospace-org/network/src/generated'
import { TitleStrongValue } from '../../atoms/TitleValue/TitleValue'
import { StartEndDateCard } from '../DateCard/DateCard'
import { StaticMapSimple } from '../PickupDropInfoCard/PickupDropInfoCard'

export interface IBookingCardProps {
  booking: NonNullable<BookingsQuery['bookings']>[number]
}

export const CustomerBookingCard = ({ booking }: IBookingCardProps) => {
  return (
    <div>
      <div className="md:flex">
        <div className="flex flex-col gap-2">
          <StartEndDateCard
            startTime={booking.startTime}
            endTime={booking.endTime}
          />

          <MapLink
            lat={booking.slot.garage.address.lat}
            lng={booking.slot.garage.address.lng}
          >
            <StaticMapSimple
              position={{
                lat: booking.slot.garage.address.lat,
                lng: booking.slot.garage.address.lng,
              }}
              className="h-full "
            />
          </MapLink>
        </div>

        <div className="flex flex-col justify-center w-full gap-2 p-2 ">
          <TitleStrongValue title={'Slot'}>
            {booking.slot.displayName}
          </TitleStrongValue>
          <TitleStrongValue title={'Vehicle number'}>
            {booking.vehicleNumber}
          </TitleStrongValue>
          <TitleStrongValue title={'Status'}>
            {booking.status.split('_').join(' ')}
          </TitleStrongValue>
          <TitleStrongValue title={'Address'}>
            <div className="flex justify-between gap-2">
              <div>{booking.slot.garage.address.address}</div>
            </div>
          </TitleStrongValue>
          <TitleStrongValue title={'Code'}>
            <Reveal secret={booking.passcode || ''} />
          </TitleStrongValue>
        </div>
      </div>
    </div>
  )
}
