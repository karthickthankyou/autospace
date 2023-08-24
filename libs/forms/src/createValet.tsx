import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const schemaCreateValet = z.object({
  email: z.string().min(1, { message: 'Valet email is required' }),
  password: z.string().min(6),
  displayName: z.string().min(1, { message: 'Valet name is required' }),
  licenceID: z.string().min(1, { message: 'Valet licence is required' }),
  image: z.any().optional(),
})

export type FormTypeCreateValet = z.infer<typeof schemaCreateValet>

export const useFormCreateValet = () =>
  useForm<FormTypeCreateValet>({
    resolver: zodResolver(schemaCreateValet),
  })
