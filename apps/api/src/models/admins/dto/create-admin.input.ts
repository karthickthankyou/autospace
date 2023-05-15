import { InputType, PickType } from '@nestjs/graphql'
import { Admin } from '../entities/admin.entity'

@InputType()
export class CreateAdminInput extends PickType(
  Admin,
  ['displayName', 'uid'],
  InputType,
) {}
