import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { AddressOrderByWithRelationInput } from 'src/models/addresses/dto/orderBy.args'
import { CompanyOrderByWithRelationInput } from 'src/models/companies/dto/orderBy.args'
import { ReviewOrderByRelationAggregateInput } from 'src/models/reviews/dto/orderBy.args'
import { ServiceOrderByRelationAggregateInput } from 'src/models/services/dto/orderBy.args'
import { SlotOrderByRelationAggregateInput } from 'src/models/slots/dto/orderBy.args'
import { VerificationOrderByWithRelationInput } from 'src/models/verifications/dto/orderBy.args'

@InputType()
export class GarageOrderByWithRelationInput
  implements
    RestrictProperties<
      GarageOrderByWithRelationInput,
      Prisma.GarageOrderByWithRelationInput
    >
{
  @Field(() => ServiceOrderByRelationAggregateInput, { nullable: true })
  services: ServiceOrderByRelationAggregateInput
  @Field(() => Prisma.SortOrder, { nullable: true })
  images: Prisma.SortOrder
  @Field(() => VerificationOrderByWithRelationInput, { nullable: true })
  verification: VerificationOrderByWithRelationInput
  @Field(() => ReviewOrderByRelationAggregateInput, { nullable: true })
  reviews: ReviewOrderByRelationAggregateInput
  @Field(() => Prisma.SortOrder, { nullable: true })
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  displayName: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  companyId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  description: Prisma.SortOrder
  @Field(() => CompanyOrderByWithRelationInput, { nullable: true })
  company: CompanyOrderByWithRelationInput
  @Field(() => SlotOrderByRelationAggregateInput, { nullable: true })
  slots: SlotOrderByRelationAggregateInput
  @Field(() => AddressOrderByWithRelationInput, { nullable: true })
  address: AddressOrderByWithRelationInput
}

@InputType()
export class GarageOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
