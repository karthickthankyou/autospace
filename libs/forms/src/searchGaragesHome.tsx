import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  getCurrentTimeAndOneHourLater,
  formSchemaSearchGarage,
} from './searchGarages'
import { SlotType } from '@autospace-org/network/src/generated'

export const formSchemaSearchGaragesHome = formSchemaSearchGarage.pick({
  startTime: true,
  endTime: true,
  type: true,
  locationInfo: true,
})

export type FormTypeSearchGaragesHome = z.infer<
  typeof formSchemaSearchGaragesHome
>

export const useFormSearchGaragesHome = () => {
  const { startTime, endTime } = getCurrentTimeAndOneHourLater()
  const methods = useForm<FormTypeSearchGaragesHome>({
    resolver: zodResolver(formSchemaSearchGaragesHome),
    defaultValues: {
      startTime,
      endTime,
      type: [
        SlotType.Bicycle,
        SlotType.Bike,
        SlotType.Car,
        SlotType.Heavy,
      ].sort(),
    },
  })
  return methods
}
