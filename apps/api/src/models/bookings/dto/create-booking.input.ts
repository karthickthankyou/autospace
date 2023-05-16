import { Field, InputType, PickType } from '@nestjs/graphql'

import { Booking } from '../entities/booking.entity'
import { Garage, SlotType } from '@prisma/client'

@InputType()
export class CreateBookingInput extends PickType(
  Booking,
  ['customerId', 'endTime', 'startTime', 'vehicleNumber'],
  InputType,
) {
  @Field(() => String, { nullable: true })
  phoneNumber: string
  garageId: Garage['id']
  @Field(() => SlotType)
  type: SlotType
}
