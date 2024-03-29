import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const createCompanySchema = z.object({
  companyName: z.string().min(1, { message: 'Company name is required' }),
  description: z.string(),
  managerName: z.string().min(1, { message: 'Manager name is required' }),
})

export type FormTypeCreateCompany = z.infer<typeof createCompanySchema>

export const useCreateCompanyForm = () =>
  useForm<FormTypeCreateCompany>({
    resolver: zodResolver(createCompanySchema),
  })
