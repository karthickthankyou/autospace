import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { VerificationOrderByRelationAggregateInput } from 'src/models/verifications/dto/orderBy.args'

@InputType()
export class AdminOrderByWithRelationInput
  implements Required<Prisma.AdminOrderByWithRelationInput>
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
  role: Prisma.SortOrder
  @Field(() => VerificationOrderByRelationAggregateInput, { nullable: true })
  verifications: VerificationOrderByRelationAggregateInput
}

@InputType()
export class AdminOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
