import { Field, InputType } from '@nestjs/graphql'
import { BookingStatus, Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import {
  BookingRelationFilter,
  EnumBookingStatusFilter,
} from 'src/models/bookings/dto/where.args'
import { ManagerRelationFilter } from 'src/models/managers/dto/where.args'

@InputType()
export class BookingTimelineWhereUniqueInput
  implements
    RestrictProperties<
      BookingTimelineWhereUniqueInput,
      Prisma.BookingTimelineWhereUniqueInput
    >
{
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class BookingTimelineWhereInput
  implements
    RestrictProperties<
      BookingTimelineWhereInput,
      Prisma.BookingTimelineWhereInput
    >
{
  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => DateTimeFilter, { nullable: true })
  timestamp: DateTimeFilter
  @Field(() => IntFilter, { nullable: true })
  bookingId: IntFilter
  @Field(() => EnumBookingStatusFilter, { nullable: true })
  status: EnumBookingStatusFilter
  @Field(() => StringFilter, { nullable: true })
  managerId: StringFilter
  @Field(() => BookingRelationFilter, { nullable: true })
  booking: BookingRelationFilter
  @Field(() => ManagerRelationFilter, { nullable: true })
  manager: ManagerRelationFilter
  // @Field(() => StringFilter, { nullable: true })
  // uid: StringFilter

  @Field(() => [BookingTimelineWhereInput], { nullable: true })
  AND: BookingTimelineWhereInput[]
  @Field(() => [BookingTimelineWhereInput], { nullable: true })
  OR: BookingTimelineWhereInput[]
  @Field(() => [BookingTimelineWhereInput], { nullable: true })
  NOT: BookingTimelineWhereInput[]
}

@InputType()
export class BookingTimelineListRelationFilter {
  @Field(() => BookingTimelineWhereInput, { nullable: true })
  every: BookingTimelineWhereInput
  @Field(() => BookingTimelineWhereInput, { nullable: true })
  some: BookingTimelineWhereInput
  @Field(() => BookingTimelineWhereInput, { nullable: true })
  none: BookingTimelineWhereInput
}

@InputType()
export class BookingTimelineRelationFilter {
  @Field(() => BookingTimelineWhereInput, { nullable: true })
  is: BookingTimelineWhereInput
  @Field(() => BookingTimelineWhereInput, { nullable: true })
  isNot: BookingTimelineWhereInput
}
