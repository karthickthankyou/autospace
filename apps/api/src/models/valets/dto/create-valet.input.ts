import { InputType, PickType } from '@nestjs/graphql'
import { Valet } from '../entities/valet.entity'

@InputType()
export class CreateValetInput extends PickType(
  Valet,
  ['displayName', 'image', 'licenceID'],
  InputType,
) {
  email: string
  password: string
}
