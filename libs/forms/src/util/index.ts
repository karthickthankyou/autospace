import { toLocalISOString } from '@autospace-org/util'

export type DateRange = {
  startTime: string
  endTime: string
}

export const isStartTimeValid = (data: DateRange) => {
  const startDate = new Date(data.startTime)
  const currentDate = new Date()
  return startDate > currentDate
}

export const isEndTimeValid = (data: DateRange) => {
  const startDate = new Date(data.startTime)
  const endDate = new Date(data.endTime)
  return endDate > startDate
}
export const getCurrentTimeAndOneHourLater = () => {
  const startTime = new Date()
  startTime.setMinutes(startTime.getMinutes() + 2)

  const endTime = new Date(startTime)
  endTime.setHours(endTime.getHours() + 1)

  return {
    startTime: toLocalISOString(startTime).slice(0, 16),
    endTime: toLocalISOString(endTime).slice(0, 16),
  }
}
