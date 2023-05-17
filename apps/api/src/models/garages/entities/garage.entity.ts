import { Field, ObjectType } from '@nestjs/graphql'
import { Garage as GarageType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Garage implements RestrictProperties<Garage, GarageType> {
  @Field(() => [String], { nullable: true })
  images: string[]
  id: number
  createdAt: Date
  updatedAt: Date
  displayName: string
  companyId: number
  description: string
}
