import { InputType, PickType } from '@nestjs/graphql'
import { Verification } from '../entities/verification.entity'

@InputType()
export class CreateVerificationInput extends PickType(
  Verification,
  ['adminId', 'garageId', 'verified'],
  InputType,
) {}
