import { ObjectType } from '@nestjs/graphql'
import { Service as ServiceType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Service implements RestrictProperties<Service, ServiceType> {
  bookingId: number
  id: number
  createdAt: Date
  updatedAt: Date
  name: string
  description: string
  price: number
  duration: number
  garageId: number
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
