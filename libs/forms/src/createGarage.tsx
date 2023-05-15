import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createManySlotsFormSchema } from './createManySlots'

export const schemaCreateGarage = z.object({
  companyId: z.string().min(1),
  displayName: z.string().min(1),
  description: z.string().min(1),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
    address: z.string(),
  }),
  slotTypes: z.array(createManySlotsFormSchema),
})

export type FormTypeCreateGarage = z.infer<typeof schemaCreateGarage>

export const useFormCreateGarage = () =>
  useForm<FormTypeCreateGarage>({
    resolver: zodResolver(schemaCreateGarage),
  })
