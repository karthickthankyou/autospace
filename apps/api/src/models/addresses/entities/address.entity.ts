import { Field, Float, ObjectType } from '@nestjs/graphql'
import { Address as AddressType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Address implements RestrictProperties<Address, AddressType> {
  id: number
  createdAt: Date
  updatedAt: Date
  garageId: number
  address: string
  @Field(() => Float)
  lat: number
  @Field(() => Float)
  lng: number
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
