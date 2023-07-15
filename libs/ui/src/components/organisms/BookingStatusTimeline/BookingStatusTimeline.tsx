import { BookingStatus } from '@autospace-org/network/src/generated'
import React from 'react'

interface BookingStatusTimelineProps {
  status: BookingStatus
}

export const BookingStatusTimeline: React.FC<BookingStatusTimelineProps> = ({
  status,
}) => {
  const statuses = Object.keys(BookingStatus)
  console.log('sd', status, statuses)

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-2">
        {statuses.map((currentStatus, index) => {
          const enumValue =
            BookingStatus[currentStatus as keyof typeof BookingStatus]
          return (
            <div
              key={index}
              className={`border border-yellow rounded-full ${
                enumValue === status
                  ? 'bg-yellow shadow-lg h-4 w-4 '
                  : 'bg-transparent h-2 w-2 '
              }`}
            />
          )
        })}
      </div>
      <div className="text-xs">{status.split('_').join(' ')}</div>
    </div>
  )
}
