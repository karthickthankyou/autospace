import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { DateTimeFilter, StringFilter } from 'src/common/dtos/common.input'
import { VerificationListRelationFilter } from 'src/models/verifications/dto/where.args'

@InputType()
export class AdminWhereUniqueInput
  implements Required<Prisma.AdminWhereUniqueInput>
{
  @Field(() => String, { nullable: true })
  uid: string
}

@InputType()
export class AdminWhereInput implements Required<Prisma.AdminWhereInput> {
  @Field(() => StringFilter, { nullable: true })
  uid: StringFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => StringFilter, { nullable: true })
  displayName: StringFilter

  @Field(() => VerificationListRelationFilter, { nullable: true })
  verifications: Prisma.VerificationListRelationFilter

  // @Field(() => StringFilter, { nullable: true })
  // uid: StringFilter

  @Field(() => [AdminWhereInput], { nullable: true })
  AND: AdminWhereInput[]
  @Field(() => [AdminWhereInput], { nullable: true })
  OR: AdminWhereInput[]
  @Field(() => [AdminWhereInput], { nullable: true })
  NOT: AdminWhereInput[]
}

@InputType()
export class AdminListRelationFilter {
  @Field(() => AdminWhereInput)
  every?: AdminWhereInput
  @Field(() => AdminWhereInput)
  some?: AdminWhereInput
  @Field(() => AdminWhereInput)
  none?: AdminWhereInput
}

@InputType()
export class AdminRelationFilter {
  @Field(() => AdminWhereInput)
  is?: AdminWhereInput
  @Field(() => AdminWhereInput)
  isNot?: AdminWhereInput
}
