import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { createManySlotsFormSchema } from './createManySlots'

export const schemaCreateGarage = z.object({
  displayName: z.string().min(1),
  description: z.string().min(1),
  images: z.any(),
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
    defaultValues: { slotTypes: [] },
  })

export const FormProviderCreateGarage = ({
  children,
}: {
  children: ReactNode
}) => {
  const methods = useFormCreateGarage()
  return <FormProvider {...methods}>{children}</FormProvider>
}
