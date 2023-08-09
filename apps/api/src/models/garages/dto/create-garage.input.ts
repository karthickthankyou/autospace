import { Field, InputType, PickType } from '@nestjs/graphql'
import { CreateAddressInputWithoutGarageId } from 'src/models/addresses/dto/create-address.input'
import { CreateSlotInputWithoutGarageId } from 'src/models/slots/dto/create-slot.input'
import { Garage } from '../entities/garage.entity'

@InputType()
export class CreateGarageInput extends PickType(
  Garage,
  ['description', 'displayName', 'images'],
  InputType,
) {
  @Field(() => CreateAddressInputWithoutGarageId)
  address: CreateAddressInputWithoutGarageId
  @Field(() => [CreateSlotInputWithoutGarageId])
  slots: CreateSlotInputWithoutGarageId[]
}
