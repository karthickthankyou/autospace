import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { GarageOrderByRelationAggregateInput } from 'src/models/garages/dto/orderBy.args'
import { ManagerOrderByRelationAggregateInput } from 'src/models/managers/dto/orderBy.args'
import { ValetOrderByRelationAggregateInput } from 'src/models/valets/dto/orderBy.args'

@InputType()
export class CompanyOrderByWithRelationInput
  implements
    RestrictProperties<
      CompanyOrderByWithRelationInput,
      Prisma.CompanyOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  description: Prisma.SortOrder
  @Field(() => ManagerOrderByRelationAggregateInput, { nullable: true })
  managers: ManagerOrderByRelationAggregateInput
  @Field(() => ValetOrderByRelationAggregateInput, { nullable: true })
  valets: ValetOrderByRelationAggregateInput

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
