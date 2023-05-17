import { Field, InputType, PickType } from '@nestjs/graphql'
import { Admin } from '../entities/admin.entity'

@InputType()
export class CreateAdminInput extends PickType(Admin, ['uid'], InputType) {
  @Field(() => String, { nullable: true })
  displayName: string
}
