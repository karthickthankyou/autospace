import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { CompanyRelationFilter } from 'src/models/companies/dto/where.args'

@InputType()
export class ManagerWhereUniqueInput
  implements Required<Prisma.ManagerWhereUniqueInput>
{
  @Field(() => String, { nullable: true })
  uid: string
  @Field(() => Number, { nullable: true })
  companyId: number
}

@InputType()
export class ManagerWhereInput implements Required<Prisma.ManagerWhereInput> {
  @Field(() => StringFilter, { nullable: true })
  uid: Prisma.StringFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: Prisma.DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: Prisma.DateTimeFilter
  @Field(() => StringFilter, { nullable: true })
  displayName: Prisma.StringFilter
  @Field(() => IntFilter, { nullable: true })
  companyId: Prisma.IntFilter
  @Field(() => CompanyRelationFilter, { nullable: true })
  company: Prisma.CompanyRelationFilter

  @Field(() => [ManagerWhereInput], { nullable: true })
  AND: Prisma.ManagerWhereInput[]
  @Field(() => [ManagerWhereInput], { nullable: true })
  OR: Prisma.ManagerWhereInput[]
  @Field(() => [ManagerWhereInput], { nullable: true })
  NOT: Prisma.ManagerWhereInput[]
}

@InputType()
//   implements Required<Prisma.ManagerListRelationFilter>
export class ManagerListRelationFilter {
  @Field(() => ManagerWhereInput)
  every: Prisma.ManagerWhereInput
  @Field(() => ManagerWhereInput)
  some: Prisma.ManagerWhereInput
  @Field(() => ManagerWhereInput)
  none: Prisma.ManagerWhereInput
}

@InputType()
export class ManagerRelationFilter
  implements Required<Prisma.ManagerRelationFilter>
{
  @Field(() => ManagerWhereInput, { nullable: true })
  is: Prisma.ManagerWhereInput
  @Field(() => ManagerWhereInput, { nullable: true })
  isNot: Prisma.ManagerWhereInput
}
