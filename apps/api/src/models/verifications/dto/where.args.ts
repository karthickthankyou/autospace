import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  BoolFilter,
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { AdminRelationFilter } from 'src/models/admins/dto/where.args'
import { GarageRelationFilter } from 'src/models/garages/dto/where.args'

@InputType()
export class VerificationWhereUniqueInput
  implements
    RestrictProperties<
      VerificationWhereUniqueInput,
      Prisma.VerificationWhereUniqueInput
    >
{
  @Field(() => Number, { nullable: true })
  garageId: number
}

@InputType()
export class VerificationWhereInput
  implements
    RestrictProperties<VerificationWhereInput, Prisma.VerificationWhereInput>
{
  @Field(() => IntFilter, { nullable: true })
  garageId: IntFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => BoolFilter, { nullable: true })
  verified: BoolFilter
  @Field(() => StringFilter, { nullable: true })
  adminId: StringFilter

  @Field(() => AdminRelationFilter, { nullable: true })
  admin: AdminRelationFilter
  @Field(() => GarageRelationFilter, { nullable: true })
  garage: GarageRelationFilter

  @Field(() => [VerificationWhereInput], { nullable: true })
  AND: VerificationWhereInput[]
  @Field(() => [VerificationWhereInput], { nullable: true })
  OR: VerificationWhereInput[]
  @Field(() => [VerificationWhereInput], { nullable: true })
  NOT: VerificationWhereInput[]
}

@InputType()
export class VerificationListRelationFilter {
  @Field(() => VerificationWhereInput)
  every?: VerificationWhereInput
  @Field(() => VerificationWhereInput)
  some?: VerificationWhereInput
  @Field(() => VerificationWhereInput)
  none?: VerificationWhereInput
}

@InputType()
export class VerificationRelationFilter {
  @Field(() => VerificationWhereInput)
  is?: VerificationWhereInput
  @Field(() => VerificationWhereInput)
  isNot?: VerificationWhereInput
}
