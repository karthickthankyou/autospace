import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { BookingOrderByWithRelationInput } from 'src/models/bookings/dto/orderBy.args'
import { GarageOrderByWithRelationInput } from 'src/models/garages/dto/orderBy.args'

@InputType()
export class ServiceOrderByWithRelationInput
  implements
    RestrictProperties<
      ServiceOrderByWithRelationInput,
      Prisma.ServiceOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  bookingId: Prisma.SortOrder
  @Field(() => BookingOrderByWithRelationInput, { nullable: true })
  Booking: BookingOrderByWithRelationInput
  @Field(() => Prisma.SortOrder, { nullable: true })
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  name: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  description: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  price: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  duration: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  garageId: Prisma.SortOrder
  @Field(() => GarageOrderByWithRelationInput, { nullable: true })
  Garage: GarageOrderByWithRelationInput
}

@InputType()
export class ServiceOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
