import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { BookingOrderByWithRelationInput } from 'src/models/bookings/dto/orderBy.args'
import { ManagerOrderByWithRelationInput } from 'src/models/managers/dto/orderBy.args'

@InputType()
export class BookingTimelineOrderByWithRelationInput
  implements
    RestrictProperties<
      BookingTimelineOrderByWithRelationInput,
      Prisma.BookingTimelineOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  timestamp: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  bookingId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  status: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  managerId: Prisma.SortOrder
  @Field(() => BookingOrderByWithRelationInput, { nullable: true })
  booking: BookingOrderByWithRelationInput
  @Field(() => ManagerOrderByWithRelationInput, { nullable: true })
  manager: ManagerOrderByWithRelationInput
}

@InputType()
export class BookingTimelineOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
