import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { BookingOrderByRelationAggregateInput } from 'src/models/bookings/dto/orderBy.args'
import { ReviewOrderByRelationAggregateInput } from 'src/models/reviews/dto/orderBy.args'

@InputType()
export class CustomerOrderByWithRelationInput
  implements
    RestrictProperties<
      CustomerOrderByWithRelationInput,
      Prisma.CustomerOrderByWithRelationInput
    >
{
  @Field(() => ReviewOrderByRelationAggregateInput, { nullable: true })
  reviews: ReviewOrderByRelationAggregateInput
  @Field(() => Prisma.SortOrder, { nullable: true })
  uid: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  displayName: Prisma.SortOrder
  @Field(() => BookingOrderByRelationAggregateInput, { nullable: true })
  bookings: BookingOrderByRelationAggregateInput
  // Todo: Add properties
  // @Field(() => Prisma.SortOrder, { nullable: true })
  // id: Prisma.SortOrder
}

@InputType()
export class CustomerOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
