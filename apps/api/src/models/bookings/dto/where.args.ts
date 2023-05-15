import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  FloatFilter,
  IntFilter,
  StringFilter,
} from 'src/common/dtos/common.input'
import { CustomerRelationFilter } from 'src/models/customers/dto/where.args'
import { SlotRelationFilter } from 'src/models/slots/dto/where.args'

@InputType()
export class BookingWhereUniqueInput
  implements Required<Prisma.BookingWhereUniqueInput>
{
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class BookingWhereInput implements Required<Prisma.BookingWhereInput> {
  @Field(() => CustomerRelationFilter, { nullable: true })
  customer: Prisma.CustomerRelationFilter
  @Field(() => SlotRelationFilter, { nullable: true })
  slot: Prisma.SlotRelationFilter
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
