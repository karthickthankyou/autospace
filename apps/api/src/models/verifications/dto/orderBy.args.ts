import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { AdminOrderByWithRelationInput } from 'src/models/admins/dto/orderBy.args'
import { GarageOrderByWithRelationInput } from 'src/models/garages/dto/orderBy.args'

@InputType()
export class VerificationOrderByWithRelationInput
  implements
    RestrictProperties<
      VerificationOrderByWithRelationInput,
      Prisma.VerificationOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  garageId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  verified: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  adminId: Prisma.SortOrder
  @Field(() => AdminOrderByWithRelationInput, { nullable: true })
  admin: Prisma.AdminOrderByWithRelationInput
  @Field(() => GarageOrderByWithRelationInput, { nullable: true })
  garage: Prisma.GarageOrderByWithRelationInput
  // Todo: Add properties
  // @Field(() => Prisma.SortOrder, { nullable: true })
  // id: Prisma.SortOrder
}

@InputType()
export class VerificationOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
