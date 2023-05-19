import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { BookingOrderByWithRelationInput } from 'src/models/bookings/dto/orderBy.args'
import { ValetOrderByWithRelationInput } from 'src/models/valets/dto/orderBy.args'

@InputType()
export class ValetAssignmentOrderByWithRelationInput
  implements
    RestrictProperties<
      ValetAssignmentOrderByWithRelationInput,
      Prisma.ValetAssignmentOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  pickupValetId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  returnValetId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  pickupLat: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  pickupLng: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  returnLat: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  returnLng: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  bookingId: Prisma.SortOrder
  @Field(() => ValetOrderByWithRelationInput, { nullable: true })
  pickupValet: ValetOrderByWithRelationInput
  @Field(() => ValetOrderByWithRelationInput, { nullable: true })
  returnValet: ValetOrderByWithRelationInput
  @Field(() => BookingOrderByWithRelationInput, { nullable: true })
  booking: BookingOrderByWithRelationInput

  // Todo: Add properties
  // @Field(() => Prisma.SortOrder, { nullable: true })
  // id: Prisma.SortOrder
}

@InputType()
export class ValetAssignmentOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
