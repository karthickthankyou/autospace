import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Admin as AdminType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Admin implements RestrictProperties<Admin, AdminType> {
  uid: string
  createdAt: Date
  updatedAt: Date
  displayName: string
}
