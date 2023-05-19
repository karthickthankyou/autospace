import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'

import { RestrictProperties } from 'src/common/dtos/common.input'
import { BookingTimelineOrderByRelationAggregateInput } from 'src/models/booking-timelines/dto/orderBy.args'
import { BookingOrderByRelationAggregateInput } from 'src/models/bookings/dto/orderBy.args'
import { CompanyOrderByWithRelationInput } from 'src/models/companies/dto/orderBy.args'

@InputType()
export class ValetOrderByWithRelationInput
  implements
    RestrictProperties<
      ValetOrderByWithRelationInput,
      Prisma.ValetOrderByWithRelationInput
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
  @Field(() => Prisma.SortOrder, { nullable: true })
  companyId: Prisma.SortOrder
  @Field(() => CompanyOrderByWithRelationInput, { nullable: true })
  company: CompanyOrderByWithRelationInput
  @Field(() => BookingOrderByRelationAggregateInput, { nullable: true })
  checkInBookings: BookingOrderByRelationAggregateInput
  @Field(() => BookingOrderByRelationAggregateInput, { nullable: true })
  checkOutBookings: BookingOrderByRelationAggregateInput
  @Field(() => BookingTimelineOrderByRelationAggregateInput, { nullable: true })
  bookingTimeline: BookingTimelineOrderByRelationAggregateInput
}

@InputType()
export class ValetOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
