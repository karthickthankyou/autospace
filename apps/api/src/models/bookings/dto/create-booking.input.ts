import { Field, InputType, PickType } from '@nestjs/graphql'

import { Booking } from '../entities/booking.entity'
import { Garage, SlotType } from '@prisma/client'
import { CreateValetAssignmentInputWithoutBookingId } from 'src/models/valet-assignments/dto/create-valet-assignment.input'
import { ConnectService } from 'src/models/services/dto/create-service.input'

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
  @Field(() => CreateValetAssignmentInputWithoutBookingId, { nullable: true })
  valetAssignment: CreateValetAssignmentInputWithoutBookingId
  @Field(() => [ConnectService])
  services: ConnectService[]
}
