import { Field, InputType, PickType } from '@nestjs/graphql'
import { Service } from '../entities/service.entity'

@InputType()
export class CreateServiceInput extends PickType(
  Service,
  ['description', 'duration', 'garageId', 'name', 'price'],
  InputType,
) {}

@InputType()
export class ConnectService {
  @Field(() => Number)
  id: number
}
