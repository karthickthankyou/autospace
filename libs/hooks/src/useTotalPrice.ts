import { useEffect, useState } from 'react'
import { SlotType, Garage } from '@autospace-org/network/src/generated'

import { differenceInTime } from '@autospace-org/util/date'

export type TotalPriceType = {
  type?: SlotType
  slots: Garage['availableSlots']
  startTime?: string
  endTime?: string
}

export const useTotalPrice = ({
  type,
  slots,
  startTime,
  endTime,
}: TotalPriceType) => {
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    // if (!type) return

    if (!startTime || !endTime) return

    const differenceInMilliseconds = differenceInTime({
      startTime: startTime,
      endTime: endTime,
    })
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60)

    const selectedSlot = slots.find((slot) => slot.type === type)

    if (!selectedSlot) return
    const totalPrice = Math.floor(
      (selectedSlot.pricePerHour || 0) * differenceInHours,
    )

    setTotalPrice(totalPrice)
  }, [slots, type, startTime, endTime])

  return totalPrice
}
