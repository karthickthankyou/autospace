import { useEffect, useState } from 'react'
import { SlotType, Garage } from '@autospace-org/network/src/generated'

import { differenceInTime } from '@autospace-org/util/date'

export type TotalPriceType = {
  pricePerHour?: number
  startTime?: string
  endTime?: string
  location?: { lat: number; lng: number }
  valet?: {
    pickup: { lat: number; lng: number }
    deliver: { lat: number; lng: number }
  }
}

export const useTotalPrice = ({
  pricePerHour,
  startTime,
  endTime,
  location,
  valet,
}: TotalPriceType) => {
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    if (!startTime || !endTime) return
    if (!pricePerHour) return

    const differenceInMilliseconds = differenceInTime({
      startTime: startTime,
      endTime: endTime,
    })
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60)

    const totalPrice = Math.floor((pricePerHour || 0) * differenceInHours)

    setTotalPrice(totalPrice)
  }, [pricePerHour, startTime, endTime])

  return totalPrice
}
