import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { BookingOrderByRelationAggregateInput } from 'src/models/bookings/dto/orderBy.args'
import { GarageOrderByWithRelationInput } from 'src/models/garages/dto/orderBy.args'

@InputType()
export class SlotOrderByWithRelationInput
  implements Required<Prisma.SlotOrderByWithRelationInput>
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  displayName: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  pricePerHour: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  type: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  length: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  width: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  height: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  garageId: Prisma.SortOrder
  @Field(() => GarageOrderByWithRelationInput, { nullable: true })
  garage: GarageOrderByWithRelationInput
  @Field(() => BookingOrderByRelationAggregateInput, { nullable: true })
  bookings: BookingOrderByRelationAggregateInput
}

@InputType()
export class SlotOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
