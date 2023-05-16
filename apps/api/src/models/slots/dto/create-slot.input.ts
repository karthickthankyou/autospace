import { InputType, OmitType, PickType } from '@nestjs/graphql'
import { Slot } from '../entities/slot.entity'

@InputType()
export class CreateSlotInput extends PickType(
  Slot,
  [
    'displayName',
    'garageId',
    'height',
    'length',
    'pricePerHour',
    'type',
    'width',
  ],
  InputType,
) {}

@InputType()
export class CreateSlotInputWithoutGarageId extends OmitType(
  CreateSlotInput,
  ['garageId'],
  InputType,
) {
  count: number
}
