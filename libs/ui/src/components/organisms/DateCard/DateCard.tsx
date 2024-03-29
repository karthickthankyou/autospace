import {
  differenceInTime,
  formatDateCustom,
  getTimeUnits,
} from '@autospace-org/util/date'
import { IconArrowRightRhombus } from '@tabler/icons-react'

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
      <div className="flex flex-col items-center">
        <IconArrowRightRhombus />
        <div className="text-xs">{numOfHours}</div>
      </div>
      <DateCard dateTime={endTime} justify="right" />
    </div>
  )
}

export const DateCard = ({
  dateTime,
  justify = 'left',
}: {
  dateTime: string
  justify?: 'left' | 'right'
}) => {
  const [date, time] = [
    formatDateCustom(dateTime, 'dd MMMM yyyy'),
    formatDateCustom(dateTime, 'HH:mm'),
  ]

  return (
    <div
      className={`flex flex-col  ${
        justify === 'left' ? 'items-start' : 'items-end'
      }`}
    >
      <div className="text-xl">{time}</div>
      <div className="text-xs text-gray-500">{date}</div>
    </div>
  )
}
