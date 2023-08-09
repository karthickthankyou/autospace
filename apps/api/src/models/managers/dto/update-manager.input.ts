import { Field, InputType, PartialType } from '@nestjs/graphql'
import { CreateManagerInput } from './create-manager.input'

@InputType()
export class UpdateManagerInput extends PartialType(CreateManagerInput) {
  @Field(() => Number, { nullable: true })
  companyId: number
  @Field(() => String, { nullable: true })
  uid: string
}
