import { ObjectType } from '@nestjs/graphql'
import { Company as CompanyType } from '@prisma/client'

@ObjectType()
export class Company implements CompanyType {
  id: number
  createdAt: Date
  updatedAt: Date
  displayName: string
}
