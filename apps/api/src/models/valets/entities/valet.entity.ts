import { ObjectType } from '@nestjs/graphql'
import { Valet as ValetType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Valet implements RestrictProperties<Valet, ValetType> {
  companyId: number
  uid: string
  createdAt: Date
  updatedAt: Date
  displayName: string
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
