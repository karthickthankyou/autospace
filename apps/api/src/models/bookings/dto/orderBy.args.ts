import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { BookingTimelineOrderByRelationAggregateInput } from 'src/models/booking-timelines/dto/orderBy.args'
import { CustomerOrderByWithRelationInput } from 'src/models/customers/dto/orderBy.args'
import { SlotOrderByWithRelationInput } from 'src/models/slots/dto/orderBy.args'
import { ValetOrderByWithRelationInput } from 'src/models/valets/dto/orderBy.args'

@InputType()
export class BookingOrderByWithRelationInput
  implements Required<Prisma.BookingOrderByWithRelationInput>
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  type: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  checkInValetId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  checkOutValetId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  bookingTimeline: BookingTimelineOrderByRelationAggregateInput
  @Field(() => ValetOrderByWithRelationInput, { nullable: true })
  checkInValet: ValetOrderByWithRelationInput
  @Field(() => ValetOrderByWithRelationInput, { nullable: true })
  checkOutValet: ValetOrderByWithRelationInput

  @Field(() => BookingTimelineOrderByRelationAggregateInput, { nullable: true })
  BookingTimeline: BookingTimelineOrderByRelationAggregateInput
  @Field(() => Prisma.SortOrder, { nullable: true })
  status: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  pricePerHour: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  totalPrice: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  startTime: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  endTime: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  slotId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  customerId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  vehicleNumber: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  phoneNumber: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  passcode: Prisma.SortOrder
  @Field(() => SlotOrderByWithRelationInput, { nullable: true })
  slot: SlotOrderByWithRelationInput
  @Field(() => CustomerOrderByWithRelationInput, { nullable: true })
  customer: CustomerOrderByWithRelationInput
  // Todo: Add properties
  // @Field(() => Prisma.SortOrder, { nullable: true })
  // id: Prisma.SortOrder
}

@InputType()
export class BookingOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
