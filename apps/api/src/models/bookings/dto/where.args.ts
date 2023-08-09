import { Field, InputType } from '@nestjs/graphql'
import { BookingStatus, Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  FloatFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { BookingTimelineListRelationFilter } from 'src/models/booking-timelines/dto/where.args'
import { CustomerRelationFilter } from 'src/models/customers/dto/where.args'
import { ServiceListRelationFilter } from 'src/models/services/dto/where.args'
import { SlotRelationFilter } from 'src/models/slots/dto/where.args'
import { ValetAssignmentRelationFilter } from 'src/models/valet-assignments/dto/where.args'

@InputType()
export class BookingWhereUniqueInput
  implements
    RestrictProperties<BookingWhereUniqueInput, Prisma.BookingWhereUniqueInput>
{
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class EnumBookingStatusFilter {
  @Field(() => BookingStatus, { nullable: true })
  equals: BookingStatus;
  @Field(() => [BookingStatus], { nullable: true })
  in: BookingStatus[]
  @Field(() => [BookingStatus], { nullable: true })
  notIn: BookingStatus[]
  @Field(() => BookingStatus, { nullable: true })
  not: BookingStatus
}

@InputType()
export class BookingWhereInput
  implements RestrictProperties<BookingWhereInput, Prisma.BookingWhereInput>
{
  @Field(() => ServiceListRelationFilter, { nullable: true })
  services: ServiceListRelationFilter
  @Field(() => ValetAssignmentRelationFilter, { nullable: true })
  valetAssignment: ValetAssignmentRelationFilter

  @Field(() => BookingTimelineListRelationFilter, { nullable: true })
  bookingTimeline: BookingTimelineListRelationFilter

  @Field(() => EnumBookingStatusFilter, { nullable: true })
  status: EnumBookingStatusFilter

  @Field(() => CustomerRelationFilter, { nullable: true })
  customer: CustomerRelationFilter

  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => FloatFilter, { nullable: true })
  pricePerHour: FloatFilter
  @Field(() => FloatFilter, { nullable: true })
  totalPrice: FloatFilter
  @Field(() => DateTimeFilter, { nullable: true })
  startTime: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  endTime: DateTimeFilter
  @Field(() => IntFilter, { nullable: true })
  slotId: IntFilter
  @Field(() => SlotRelationFilter, { nullable: true })
  slot: SlotRelationFilter
  @Field(() => StringFilter, { nullable: true })
  customerId: StringFilter
  @Field(() => StringFilter, { nullable: true })
  vehicleNumber: StringFilter
  @Field(() => StringFilter, { nullable: true })
  phoneNumber: StringFilter
  @Field(() => StringFilter, { nullable: true })
  passcode: StringFilter

  @Field(() => [BookingWhereInput], { nullable: true })
  AND: BookingWhereInput[]
  @Field(() => [BookingWhereInput], { nullable: true })
  OR: BookingWhereInput[]
  @Field(() => [BookingWhereInput], { nullable: true })
  NOT: BookingWhereInput[]
}

@InputType()
export class BookingListRelationFilter {
  @Field(() => BookingWhereInput)
  every?: BookingWhereInput
  @Field(() => BookingWhereInput)
  some?: BookingWhereInput
  @Field(() => BookingWhereInput)
  none?: BookingWhereInput
}

@InputType()
export class BookingRelationFilter {
  @Field(() => BookingWhereInput)
  is?: BookingWhereInput
  @Field(() => BookingWhereInput)
  isNot?: BookingWhereInput
}
