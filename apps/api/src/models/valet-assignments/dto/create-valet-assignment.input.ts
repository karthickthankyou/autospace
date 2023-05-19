import { InputType, PickType } from '@nestjs/graphql'
import { ValetAssignment } from '../entities/valet-assignment.entity'

@InputType()
export class CreateValetAssignmentInput extends PickType(
  ValetAssignment,
  ['bookingId', 'pickupLat', 'pickupLng', 'returnLat', 'returnLng'],
  InputType,
) {}

@InputType()
export class CreateValetAssignmentInputWithoutBookingId extends PickType(
  ValetAssignment,
  ['pickupLat', 'pickupLng', 'returnLat', 'returnLng'],
  InputType,
) {}
