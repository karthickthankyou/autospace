import { InputType, PartialType } from '@nestjs/graphql'
import { Service } from '@prisma/client'
import { CreateServiceInput } from './create-service.input'

@InputType()
export class UpdateServiceInput extends PartialType(CreateServiceInput) {
  id: Service['id']
}
