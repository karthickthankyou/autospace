import { useEffect, useState } from 'react'
import { SlotType, Garage } from '@autospace-org/network/src/generated'
import { FormTypeBookSlot } from '@autospace-org/forms/src/bookSlot'
import { DeepPartialSkipArrayKey } from 'react-hook-form'

import { differenceInTime } from '@autospace-org/util/date'

export type TotalPriceType = {
  pricePerHour?: number
  startTime?: string
  endTime?: string
  location?: { lat: number; lng: number }
  valet?: DeepPartialSkipArrayKey<FormTypeBookSlot['valet']>
  differentDropoffLocation?: boolean
}

export const VALET_CHARGE_PER_METER = 0.02

export const useTotalPrice = ({
  pricePerHour,
  startTime,
  endTime,
  valet,
  differentDropoffLocation,
}: TotalPriceType) => {
  const [parkingCharge, setParkingCharge] = useState(0)
  const [valetChargePickup, setValetChargePickup] = useState(0)
  const [valetChargeDropoff, setValetChargeDropoff] = useState(0)

  useEffect(() => {
    if (!startTime || !endTime) return
    if (!pricePerHour) return

    const differenceInMilliseconds = differenceInTime({
      startTime: startTime,
      endTime: endTime,
    })
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60)

    const parkingCharge = Math.floor((pricePerHour || 0) * differenceInHours)

    setParkingCharge(parkingCharge)
  }, [pricePerHour, startTime, endTime])

  useEffect(() => {
    const pickupCharge = valet?.pickupInfo?.distance
      ? valet?.pickupInfo?.distance * VALET_CHARGE_PER_METER
      : 0
    const dropoffCharge = valet?.dropoffInfo?.distance
      ? valet.dropoffInfo.distance * VALET_CHARGE_PER_METER
      : 0

    setValetChargePickup(Math.floor(pickupCharge))
    setValetChargeDropoff(
      Math.floor(differentDropoffLocation ? dropoffCharge : pickupCharge),
    )
  }, [valet])

  return { parkingCharge, valetChargePickup, valetChargeDropoff }
}
