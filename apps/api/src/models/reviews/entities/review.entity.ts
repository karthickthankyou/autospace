import { ObjectType } from '@nestjs/graphql'
import { Review as ReviewType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Review implements RestrictProperties<Review, ReviewType> {
  id: number
  createdAt: Date
  updatedAt: Date
  garageId: number
  customerId: string
  rating: number
  comment: string
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
