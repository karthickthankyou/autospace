import { Field, InputType, PickType } from '@nestjs/graphql'
import { Company } from '../entities/company.entity'

@InputType()
export class CreateCompanyInput extends PickType(
  Company,
  ['displayName'],
  InputType,
) {
  @Field(() => String)
  managerDisplayName: string
}
