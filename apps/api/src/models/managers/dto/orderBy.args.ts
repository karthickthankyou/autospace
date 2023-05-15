import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { CompanyOrderByWithRelationInput } from 'src/models/companies/dto/orderBy.args'

@InputType()
export class ManagerOrderByWithRelationInput
  implements Required<Prisma.ManagerOrderByWithRelationInput>
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  uid: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  displayName: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  companyId: Prisma.SortOrder
  @Field(() => CompanyOrderByWithRelationInput, { nullable: true })
  company: CompanyOrderByWithRelationInput
}

@InputType()
export class ManagerOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
