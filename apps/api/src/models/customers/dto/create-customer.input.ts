import { InputType, PickType } from '@nestjs/graphql'
import { Customer } from '../entities/customer.entity'

@InputType()
export class CreateCustomerInput extends PickType(
  Customer,
  ['displayName', 'uid'],
  InputType,
) {}
