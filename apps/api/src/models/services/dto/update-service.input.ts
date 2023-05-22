import { CreateServiceInput } from './create-service.input'
import { InputType, PartialType } from '@nestjs/graphql'
import { Service } from '@prisma/client'

@InputType()
export class UpdateServiceInput extends PartialType(CreateServiceInput) {
  id: Service['id']
}
