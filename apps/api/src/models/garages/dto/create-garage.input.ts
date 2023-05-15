import { Field, InputType, PickType } from '@nestjs/graphql'
import { Garage } from '../entities/garage.entity'
import { CreateAddressInputWithoutGarageId } from 'src/models/addresses/dto/create-address.input'
import { CreateMultipleSlotInputWithoutGarageId } from 'src/models/slots/dto/create-slot.input'

@InputType()
export class CreateGarageInput extends PickType(
  Garage,
  ['companyId', 'description', 'displayName', 'imageUrl'],
  InputType,
) {
  @Field(() => CreateAddressInputWithoutGarageId)
  address: CreateAddressInputWithoutGarageId
  @Field(() => CreateMultipleSlotInputWithoutGarageId)
  slots: CreateMultipleSlotInputWithoutGarageId
}
