import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  IntFilter,
  StringFilter,
} from 'src/common/dtos/common.input'
import { GarageListRelationFilter } from 'src/models/garages/dto/where.args'
import { ManagerRelationFilter } from 'src/models/managers/dto/where.args'
import { ValetListRelationFilter } from 'src/models/valets/dto/where.args'

@InputType()
export class CompanyWhereUniqueInput
  implements Required<Prisma.CompanyWhereUniqueInput>
{
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class CompanyWhereInput implements Required<Prisma.CompanyWhereInput> {
  @Field(() => ValetListRelationFilter, { nullable: true })
  valets: ValetListRelationFilter
  @Field(() => ManagerRelationFilter, { nullable: true })
  manager: Prisma.ManagerRelationFilter
  @Field(() => IntFilter, { nullable: true })
  id: Prisma.IntFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: Prisma.DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: Prisma.DateTimeFilter
  @Field(() => StringFilter, { nullable: true })
  displayName: Prisma.StringFilter

  @Field(() => GarageListRelationFilter, { nullable: true })
  garages: Prisma.GarageListRelationFilter

  @Field(() => [CompanyWhereInput], { nullable: true })
  AND: Prisma.CompanyWhereInput[]
  @Field(() => [CompanyWhereInput], { nullable: true })
  OR: Prisma.CompanyWhereInput[]
  @Field(() => [CompanyWhereInput], { nullable: true })
  NOT: Prisma.CompanyWhereInput[]
}

@InputType()
export class CompanyListRelationFilter {
  @Field(() => CompanyWhereInput)
  every?: CompanyWhereInput
  @Field(() => CompanyWhereInput)
  some?: CompanyWhereInput
  @Field(() => CompanyWhereInput)
  none?: CompanyWhereInput
}

@InputType()
export class CompanyRelationFilter {
  @Field(() => CompanyWhereInput)
  is?: CompanyWhereInput
  @Field(() => CompanyWhereInput)
  isNot?: CompanyWhereInput
}
