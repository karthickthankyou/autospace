import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SlotType } from '@autospace-org/network/src/generated'
import { ReactNode, useEffect } from 'react'
import {
  getCurrentTimeAndOneHourLater,
  isEndTimeValid,
  isStartTimeValid,
} from './util'

export const formSchemaBookSlot = z.object({
  startTime: z.string(),
  endTime: z.string(),

  vehicleNumber: z.string().min(1, { message: 'Vehicle number is required' }),
  type: z.nativeEnum(SlotType, {
    required_error: 'Slot type is required',
  }),
  phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
})

export type FormTypeBookSlot = z.infer<typeof formSchemaBookSlot>

formSchemaBookSlot
  .refine(isStartTimeValid, {
    message: 'Start time should be greater than current time',
    path: ['startTime'],
  })
  .refine(isEndTimeValid, {
    message: 'End time should be greater than start time',
    path: ['endTime'],
  })

export const userFormBookSlot = () =>
  useForm<FormTypeBookSlot>({
    resolver: zodResolver(formSchemaBookSlot),
  })

export const FormProviderBookSlot = ({ children }: { children: ReactNode }) => {
  const { startTime: currentTime, endTime: currentTimePlusOneHour } =
    getCurrentTimeAndOneHourLater()
  const methods = userFormBookSlot()

  useEffect(() => {
    methods.setValue('startTime', currentTime)
    methods.setValue('endTime', currentTimePlusOneHour)
  }, [])

  return <FormProvider {...methods}>{children}</FormProvider>
}
