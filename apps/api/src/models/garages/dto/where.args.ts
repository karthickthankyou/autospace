import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { AddressRelationFilter } from 'src/models/addresses/dto/where.args'
import { CompanyRelationFilter } from 'src/models/companies/dto/where.args'
import { ReviewListRelationFilter } from 'src/models/reviews/dto/where.args'
import { SlotListRelationFilter } from 'src/models/slots/dto/where.args'
import { VerificationRelationFilter } from 'src/models/verifications/dto/where.args'

@InputType()
export class GarageWhereUniqueInput
  implements Required<Prisma.GarageWhereUniqueInput>
{
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class GarageWhereInput implements Required<Prisma.GarageWhereInput> {
  @Field(() => StringFilter, { nullable: true })
  imageUrl: StringFilter

  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => StringFilter, { nullable: true })
  displayName: StringFilter
  @Field(() => IntFilter, { nullable: true })
  companyId: IntFilter
  @Field(() => StringFilter, { nullable: true })
  description: StringFilter
  @Field(() => VerificationRelationFilter, { nullable: true })
  verification: Prisma.VerificationRelationFilter
  @Field(() => CompanyRelationFilter, { nullable: true })
  company: Prisma.CompanyRelationFilter
  @Field(() => SlotListRelationFilter, { nullable: true })
  slots: Prisma.SlotListRelationFilter
  @Field(() => AddressRelationFilter, { nullable: true })
  address: Prisma.AddressRelationFilter
  @Field(() => ReviewListRelationFilter, { nullable: true })
  reviews: Prisma.ReviewListRelationFilter

  @Field(() => [GarageWhereInput], { nullable: true })
  AND: GarageWhereInput[]
  @Field(() => [GarageWhereInput], { nullable: true })
  OR: GarageWhereInput[]
  @Field(() => [GarageWhereInput], { nullable: true })
  NOT: GarageWhereInput[]
}

@InputType()
export class GarageListRelationFilter {
  @Field(() => GarageWhereInput, { nullable: true })
  every: GarageWhereInput
  @Field(() => GarageWhereInput, { nullable: true })
  some: GarageWhereInput
  @Field(() => GarageWhereInput, { nullable: true })
  none: GarageWhereInput
}

@InputType()
export class GarageRelationFilter
  implements
    RestrictProperties<GarageRelationFilter, Prisma.GarageRelationFilter>
{
  @Field(() => GarageWhereInput, { nullable: true })
  is: GarageWhereInput
  @Field(() => GarageWhereInput, { nullable: true })
  isNot: GarageWhereInput
}
