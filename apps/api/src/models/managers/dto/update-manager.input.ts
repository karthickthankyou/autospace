import { CreateManagerInput } from './create-manager.input'
import { Field, InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateManagerInput extends PartialType(CreateManagerInput) {
  @Field(() => Number, { nullable: true })
  companyId: number
  @Field(() => String, { nullable: true })
  uid: string
}
