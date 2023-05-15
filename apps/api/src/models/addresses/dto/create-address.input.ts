import { InputType, PickType } from '@nestjs/graphql'
import { Address } from '../entities/address.entity'

@InputType()
export class CreateAddressInput extends PickType(
  Address,
  ['address', 'garageId', 'lat', 'lng'],
  InputType,
) {}
@InputType()
export class CreateAddressInputWithoutGarageId extends PickType(
  CreateAddressInput,
  ['address', 'lat', 'lng'],
  InputType,
) {}
