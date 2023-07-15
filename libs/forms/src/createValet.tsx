import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const schemaCreateValet = z.object({
  password: z.string().min(1, { message: 'Valet uid is required' }),
  email: z.string().min(1, { message: 'Valet uid is required' }),
  displayName: z.string().min(1, { message: 'Valet name is required' }),
  licenceID: z.string().min(1, { message: 'Valet name is required' }),
  image: z.any().optional(),
})

export type FormTypeCreateValet = z.infer<typeof schemaCreateValet>

export const useFormCreateValet = () =>
  useForm<FormTypeCreateValet>({
    resolver: zodResolver(schemaCreateValet),
  })
