import { Field, Float, InputType, PickType } from '@nestjs/graphql'
import { ValetAssignment } from '../entities/valet-assignment.entity'
import { CreateBookingInput } from 'prisma/seed/generated/graphql'

@InputType()
export class CreateValetAssignmentInput extends PickType(
  ValetAssignment,
  ['bookingId', 'pickupLat', 'pickupLng', 'returnLat', 'returnLng'],
  InputType,
) {}

@InputType()
export class CreateValetAssignmentInputWithoutBookingId {
  @Field(() => Float)
  pickupLat: number

  @Field(() => Float)
  pickupLng: number

  @Field(() => Float, { nullable: true })
  returnLat?: number

  @Field(() => Float, { nullable: true })
  returnLng?: number
}
