import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { GarageOrderByRelationAggregateInput } from 'src/models/garages/dto/orderBy.args'
import { ManagerOrderByWithRelationInput } from 'src/models/managers/dto/orderBy.args'
import { ValetOrderByRelationAggregateInput } from 'src/models/valets/dto/orderBy.args'

@InputType()
export class CompanyOrderByWithRelationInput
  implements Required<Prisma.CompanyOrderByWithRelationInput>
{
  @Field(() => ValetOrderByRelationAggregateInput, { nullable: true })
  valets: ValetOrderByRelationAggregateInput
  @Field(() => ManagerOrderByWithRelationInput, { nullable: true })
  manager: Prisma.ManagerOrderByWithRelationInput
  @Field(() => Prisma.SortOrder, { nullable: true })
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  displayName: Prisma.SortOrder

  @Field(() => GarageOrderByRelationAggregateInput, { nullable: true })
  garages: Prisma.GarageOrderByRelationAggregateInput
  // Todo: Add properties
  // @Field(() => Prisma.SortOrder, { nullable: true })
  // id: Prisma.SortOrder
}

@InputType()
export class CompanyOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
