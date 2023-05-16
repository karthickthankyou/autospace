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
  startTime.setMinutes(startTime.getMinutes() + 5)

  startTime.setTime(
    startTime.getTime() - startTime.getTimezoneOffset() * 60 * 1000,
  )

  const endTime = new Date(startTime)
  endTime.setHours(endTime.getHours() + 1)

  return {
    startTime: startTime.toISOString().slice(0, 16),
    endTime: endTime.toISOString().slice(0, 16),
  }
}
