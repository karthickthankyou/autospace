import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { VerificationOrderByRelationAggregateInput } from 'src/models/verifications/dto/orderBy.args'

@InputType()
export class AdminOrderByWithRelationInput
  implements
    RestrictProperties<
      AdminOrderByWithRelationInput,
      Prisma.AdminOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  uid: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  displayName: Prisma.SortOrder
  @Field(() => VerificationOrderByRelationAggregateInput, { nullable: true })
  verifications: VerificationOrderByRelationAggregateInput
}

@InputType()
export class AdminOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
