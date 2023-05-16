import { IconArrowRightRhombus } from '@tabler/icons-react'
import {
  differenceInTime,
  formatDateCustom,
  getTimeUnits,
} from '@autospace-org/util/date'

export interface IDateCardProps {
  startTime: string
  endTime: string
}

export const StartEndDateCard = ({ startTime, endTime }: IDateCardProps) => {
  const numOfHours = getTimeUnits(
    differenceInTime({ startTime, endTime }),
  ).timeString
  return (
    <div className="flex items-center justify-between gap-2">
      <DateCard dateTime={startTime} />
      <div>
        <IconArrowRightRhombus />
        <div className="text-xs">{numOfHours}</div>
      </div>
      <DateCard dateTime={endTime} />
    </div>
  )
}

export const DateCard = ({ dateTime }: { dateTime: string }) => {
  const [date, time, year] = [
    formatDateCustom(dateTime, 'dd MMM'),
    formatDateCustom(dateTime, 'HH:mm'),
    formatDateCustom(dateTime, 'yyyy'),
  ]

  return (
    <div className="flex flex-col items-end">
      <div className="text-3xl font-light">{time}</div>
      <div className="mt-1">{date}</div>
      <div className="text-xs text-gray-500">{year}</div>
    </div>
  )
}
