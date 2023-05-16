import { boolean } from 'zod'

import { CustomerBookingCard } from '../../organisms/BookingCard/BookingCard'
import { useUserStore } from '@autospace-org/store/user'
import { useBookingsQuery } from '@autospace-org/network/src/generated'
import { LoaderPanel } from '../../molecules/Loader'
import { AlertSection } from '../../organisms/AlertSection'

export interface ICustomerBookingsProps {}

export const CustomerBookings = ({}: ICustomerBookingsProps) => {
  const uid = useUserStore((state) => state.uid)
  const { loading, data } = useBookingsQuery()
  if (loading) return <LoaderPanel />

  const currentTime = new Date()

  const currentList =
    data?.bookings?.filter(
      (booking) =>
        new Date(booking.endTime) > currentTime &&
        new Date(booking.startTime) < currentTime,
    ) || []
  const pastList =
    data?.bookings?.filter(
      (booking) => new Date(booking.endTime) <= currentTime,
    ) || []

  const upcomingList = data?.bookings
    ?.filter((booking) => new Date(booking.startTime) > currentTime)
    .sort((a, b) => {
      const first = new Date(a.startTime)
      const second = new Date(b.startTime)
      return first > second ? 1 : -1
    })

  return (
    <div className="space-y-16">
      <div>
        <div>Ongoing</div>
        <div className="grid grid-cols-3 gap-16">
          {currentList.length === 0 ? (
            <AlertSection>No results</AlertSection>
          ) : null}
          {currentList.map((booking) => (
            <CustomerBookingCard booking={booking} />
          ))}
        </div>
      </div>
      <div>
        <div>Upcoming bookings</div>
        <div className="grid grid-cols-3 gap-16">
          {upcomingList?.length === 0 ? (
            <AlertSection>No results</AlertSection>
          ) : null}
          {upcomingList?.map((booking) => (
            <CustomerBookingCard booking={booking} />
          ))}
        </div>
      </div>
      <div>
        <div>Past bookings</div>
        <div className="grid grid-cols-3 gap-16">
          {pastList?.length === 0 ? (
            <AlertSection>No results</AlertSection>
          ) : null}
          {pastList.map((booking) => (
            <CustomerBookingCard booking={booking} />
          ))}
        </div>
      </div>
    </div>
  )
}
