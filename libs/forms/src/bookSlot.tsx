import { SlotType } from '@autospace-org/network/src/generated'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  getCurrentTimeAndOneHourLater,
  isEndTimeValid,
  isStartTimeValid,
} from './util'

export const locationInfo = z
  .object({
    notes: z.string().min(1).optional(),
    lat: z.number(),
    lng: z.number(),
    distance: z.number().optional(),
  })
  .optional()
export const serviceInfo = z
  .object({
    id: z.number(),
    price: z.number(),
    duration: z.number(),
  })
  .optional()

export const formSchemaValet = z
  .object({
    pickupInfo: locationInfo,
    dropoffInfo: locationInfo,
    differentLocations: z.boolean().optional(),
  })
  .optional()

export const formSchemaBookSlot = z.object({
  startTime: z.string(),
  endTime: z.string(),

  valet: formSchemaValet,
  services: z.array(serviceInfo).optional(),

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
