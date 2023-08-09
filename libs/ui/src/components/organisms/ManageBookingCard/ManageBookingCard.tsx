import {
  BookingsForGarageQuery,
  ValetFieldsFragment,
} from '@autospace-org/network/src/generated'
import Image from 'next/image'
import { TitleStrongValue, TitleValue } from '../../atoms/TitleValue/TitleValue'
import { Reveal } from '../../molecules/Reveal'
import { StartEndDateCard } from '../DateCard/DateCard'

export interface IManageBookingCardProps {
  booking: BookingsForGarageQuery['bookingsForGarage'][0]
}

export const ManageBookingCard = ({ booking }: IManageBookingCardProps) => {
  return (
    <div className="p-4 space-y-3 bg-white ">
      <div className="flex items-start justify-between">
        <TitleStrongValue title={'Vehicle number'}>
          <div className="text-3xl font-bold">{booking.vehicleNumber}</div>
        </TitleStrongValue>
        <div className="px-1 py-0.5 border border-primary">
          <TitleValue title={'Slot'}>{booking.slot.displayName}</TitleValue>
        </div>
      </div>
      <TitleStrongValue title={'Status'}>
        <div className="font-bold">{booking.status.split('_').join(' ')}</div>
      </TitleStrongValue>

      <TitleStrongValue title={'Code'}>
        <Reveal showIntruction={false} secret={booking.passcode || ''} />
      </TitleStrongValue>
      <StartEndDateCard
        startTime={booking.startTime}
        endTime={booking.endTime}
      />
    </div>
  )
}

export const ValetInBookingCard = ({
  valet,
}: {
  valet?: ValetFieldsFragment | null
}) => {
  if (!valet) {
    return null
  }
  return (
    <div className="flex gap-2 px-4 py-2 bg-white">
      <Image
        alt=""
        width={200}
        height={200}
        className="object-cover w-16 h-16 rounded-full"
        src={valet.image || ''}
      />
      <div>
        <div>{valet.displayName}</div>
        <div className="text-xs">{valet.uid}</div>
      </div>
    </div>
  )
}
