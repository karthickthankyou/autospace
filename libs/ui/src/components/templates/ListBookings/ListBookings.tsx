import {
  BookingStatus,
  QueryMode,
  namedOperations,
  useBookingsForGarageQuery,
  useCreateBookingTimelineMutation,
} from '@autospace-org/network/src/generated'
import { Tab, Tabs } from '../../molecules/Tabs'
import { TabPanel } from '../../molecules/Tabs/Tabs'
import { useState } from 'react'
import { ShowData } from '../../organisms/ShowData'
import { ManageBookingCard } from '../../organisms/ManageBookingCard'
import { useTakeSkip } from '@autospace-org/hooks/src/async'
import { Button } from '../../atoms/Button'
import { ValetInBookingCard } from '../../organisms/ManageBookingCard/ManageBookingCard'

export interface IListBookingsProps {
  garageId: number
}

export const ListBookings = ({ garageId }: IListBookingsProps) => {
  const [value, setValue] = useState<0 | 1 | 2>(0)
  return (
    <div>
      <Tabs
        value={value}
        onChange={(e, v) => setValue(v)}
        aria-label="bookings"
      >
        <Tab label={'IN'} />
        <Tab label={'OUT'} />
        <Tab label={'RESOLVED'} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ShowGarageBookings
          garageId={garageId}
          statuses={[
            BookingStatus.Booked,
            BookingStatus.ValetPickedUp,
            BookingStatus.ValetAssignedForCheckIn,
          ]}
          type="Pickup"
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ShowGarageBookings
          garageId={garageId}
          statuses={[
            BookingStatus.CheckedIn,
            BookingStatus.ValetAssignedForCheckOut,
          ]}
          type="Return"
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ShowGarageBookings
          garageId={garageId}
          statuses={[BookingStatus.CheckedOut]}
        />
      </TabPanel>
    </div>
  )
}

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
    fetchPolicy: 'no-cache',
  })

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
        error={error?.message}
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
