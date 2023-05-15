import { ObjectType } from '@nestjs/graphql'
import { Manager as ManagerType } from '@prisma/client'

@ObjectType()
export class Manager implements ManagerType {
  uid: string
  createdAt: Date
  updatedAt: Date
  displayName: string
  companyId: number
}
