import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { CustomerOrderByWithRelationInput } from 'src/models/customers/dto/orderBy.args'
import { GarageOrderByWithRelationInput } from 'src/models/garages/dto/orderBy.args'

@InputType()
export class ReviewOrderByWithRelationInput
  implements Required<Prisma.ReviewOrderByWithRelationInput>
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  garageId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  customerId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  rating: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  comment: Prisma.SortOrder
  @Field(() => GarageOrderByWithRelationInput, { nullable: true })
  garage: GarageOrderByWithRelationInput
  @Field(() => CustomerOrderByWithRelationInput, { nullable: true })
  customer: CustomerOrderByWithRelationInput
  // Todo: Add properties
  // @Field(() => Prisma.SortOrder, { nullable: true })
  // id: Prisma.SortOrder
}

@InputType()
export class ReviewOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
