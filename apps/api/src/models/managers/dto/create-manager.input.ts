import { InputType, PickType } from '@nestjs/graphql'
import { Manager } from '../entities/manager.entity'

@InputType()
export class CreateManagerInput extends PickType(
  Manager,
  ['companyId', 'displayName', 'uid'],
  InputType,
) {}
