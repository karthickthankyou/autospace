import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import { BookingStatus, BookingType, Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  FloatFilter,
  IntFilter,
  StringFilter,
} from 'src/common/dtos/common.input'
import { BookingTimelineListRelationFilter } from 'src/models/booking-timelines/dto/where.args'
import { CustomerRelationFilter } from 'src/models/customers/dto/where.args'
import { SlotRelationFilter } from 'src/models/slots/dto/where.args'
import { ValetRelationFilter } from 'src/models/valets/dto/where.args'

@InputType()
export class BookingWhereUniqueInput
  implements Required<Prisma.BookingWhereUniqueInput>
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

registerEnumType(BookingType, { name: 'BookingType' })

@InputType()
export class EnumBookingTypeFilter {
  @Field(() => BookingType, { nullable: true })
  equals: BookingType;
  @Field(() => [BookingType], { nullable: true })
  in: BookingType[]
  @Field(() => [BookingType], { nullable: true })
  notIn: BookingType[]
  @Field(() => BookingStatus, { nullable: true })
  not: BookingType
}

@InputType()
export class BookingWhereInput implements Required<Prisma.BookingWhereInput> {
  @Field(() => EnumBookingTypeFilter, { nullable: true })
  type: EnumBookingTypeFilter

  @Field(() => StringFilter, { nullable: true })
  checkInValetId: StringFilter

  @Field(() => StringFilter, { nullable: true })
  checkOutValetId: StringFilter

  @Field(() => BookingTimelineListRelationFilter, { nullable: true })
  bookingTimeline: BookingTimelineListRelationFilter

  @Field(() => ValetRelationFilter, { nullable: true })
  checkInValet: ValetRelationFilter

  @Field(() => ValetRelationFilter, { nullable: true })
  checkOutValet: ValetRelationFilter

  @Field(() => BookingTimelineListRelationFilter, { nullable: true })
  BookingTimeline: BookingTimelineListRelationFilter

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
