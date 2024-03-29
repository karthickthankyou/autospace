import { Field, InputType, PickType } from '@nestjs/graphql'

import { Garage, SlotType } from '@prisma/client'
import { CreateValetAssignmentInputWithoutBookingId } from 'src/models/valet-assignments/dto/create-valet-assignment.input'
import { Booking } from '../entities/booking.entity'

@InputType()
export class CreateBookingInput extends PickType(
  Booking,
  ['customerId', 'endTime', 'startTime', 'vehicleNumber'],
  InputType,
) {
  phoneNumber?: Booking['phoneNumber']
  garageId: Garage['id']
  @Field(() => SlotType)
  type: SlotType
  @Field(() => CreateValetAssignmentInputWithoutBookingId, { nullable: true })
  valetAssignment?: CreateValetAssignmentInputWithoutBookingId
}
