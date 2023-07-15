import { Field, Float, ObjectType } from '@nestjs/graphql'
import { ValetAssignment as ValetAssignmentType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class ValetAssignment
  implements RestrictProperties<ValetAssignment, ValetAssignmentType>
{
  createdAt: Date
  updatedAt: Date
  bookingId: number

  @Field(() => String, { nullable: true })
  pickupValetId: string
  @Field(() => String, { nullable: true })
  returnValetId: string

  @Field(() => Float)
  pickupLat: number
  @Field(() => Float)
  pickupLng: number
  @Field(() => Float, { nullable: true })
  returnLat: number
  @Field(() => Float, { nullable: true })
  returnLng: number
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
