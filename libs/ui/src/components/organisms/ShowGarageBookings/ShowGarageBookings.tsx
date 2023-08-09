import { useTakeSkip } from '@autospace-org/hooks/src/async'
import {
  BookingStatus,
  namedOperations,
  QueryMode,
  useBookingsForGarageQuery,
  useCreateBookingTimelineMutation,
} from '@autospace-org/network/src/generated'
import { useState } from 'react'
import { Button } from '../../atoms/Button'
import { ManageBookingCard } from '../../organisms/ManageBookingCard'
import { ValetInBookingCard } from '../../organisms/ManageBookingCard/ManageBookingCard'
import { ShowData } from '../../organisms/ShowData'

export interface IShowGarageBookingsProps {}

export const ShowGarageBookings = ({
  garageId,
  statuses,
  type,
}: {
  garageId: number
  statuses: BookingStatus[]
  type?: 'Pickup' | 'Return'
}) => {
  const { take, setTake, skip, setSkip } = useTakeSkip()
  const [searchTerm, setSearchTerm] = useState('')

  const { data, loading, error } = useBookingsForGarageQuery({
    variables: {
      skip,
      take,
      where: {
        status: { in: statuses },
        slot: { is: { garageId: { equals: garageId } } },
        ...(searchTerm && {
          vehicleNumber: {
            contains: searchTerm,
            mode: QueryMode.Insensitive,
          },
        }),
      },
    },
  })

  console.log('error', error)

  return (
    <div className="mt-4 space-y-6">
      <div className="flex justify-center">
        <input
          placeholder="Search vehicle number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xl p-4 rounded-full shadow-xl"
        />
      </div>
      <ShowData
        loading={loading}
        pagination={{
          skip,
          take,
          resultCount: data?.bookingsForGarage.length,
          totalCount: data?.bookingsCount.count,
          setSkip,
          setTake,
        }}
        title={undefined}
      >
        {data?.bookingsForGarage.map((booking) => (
          <div key={booking.id} className="space-y-1">
            <ManageBookingCard booking={booking} />
            {type === 'Pickup' ? (
              <>
                {booking.valetAssignment ? (
                  <ValetInBookingCard
                    valet={booking.valetAssignment.pickupValet}
                  />
                ) : null}
                <CheckInButton bookingId={booking.id} />
              </>
            ) : null}
            {type === 'Return' ? (
              <>
                {booking.valetAssignment ? (
                  <ValetInBookingCard
                    valet={booking.valetAssignment.returnValet}
                  />
                ) : null}
                <CheckOutButton bookingId={booking.id} />
              </>
            ) : null}
          </div>
        ))}
      </ShowData>
    </div>
  )
}

export const CheckInButton = ({ bookingId }: { bookingId: number }) => {
  const [checkIn, { data, loading }] = useCreateBookingTimelineMutation()
  return (
    <Button
      loading={loading}
      onClick={() => {
        checkIn({
          variables: {
            createBookingTimelineInput: {
              bookingId,
              status: BookingStatus.CheckedIn,
            },
          },
          awaitRefetchQueries: true,
          refetchQueries: [namedOperations.Query.bookingsForGarage],
        })
      }}
      color="white"
      fullWidth
    >
      Check In
    </Button>
  )
}

export const CheckOutButton = ({ bookingId }: { bookingId: number }) => {
  const [checkIn, { data, loading }] = useCreateBookingTimelineMutation()
  return (
    <Button
      loading={loading}
      onClick={() => {
        checkIn({
          variables: {
            createBookingTimelineInput: {
              bookingId,
              status: BookingStatus.CheckedOut,
            },
          },
          awaitRefetchQueries: true,
          refetchQueries: [namedOperations.Query.bookingsForGarage],
        })
      }}
      color="white"
      className="mt-1"
      fullWidth
    >
      Check Out
    </Button>
  )
}
