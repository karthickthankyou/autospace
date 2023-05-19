import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { BookingTimelineListRelationFilter } from 'src/models/booking-timelines/dto/where.args'
import { BookingListRelationFilter } from 'src/models/bookings/dto/where.args'
import { CompanyRelationFilter } from 'src/models/companies/dto/where.args'

@InputType()
export class ValetWhereUniqueInput
  implements
    RestrictProperties<ValetWhereUniqueInput, Prisma.ValetWhereUniqueInput>
{
  @Field(() => Number, { nullable: true })
  companyId: number
  @Field(() => String, { nullable: true })
  uid: string
}

@InputType()
export class ValetWhereInput
  implements RestrictProperties<ValetWhereInput, Prisma.ValetWhereInput>
{
  @Field(() => StringFilter, { nullable: true })
  uid: StringFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => StringFilter, { nullable: true })
  displayName: StringFilter
  @Field(() => IntFilter, { nullable: true })
  companyId: IntFilter
  @Field(() => CompanyRelationFilter, { nullable: true })
  company: CompanyRelationFilter
  @Field(() => BookingListRelationFilter, { nullable: true })
  checkInBookings: BookingListRelationFilter
  @Field(() => BookingListRelationFilter, { nullable: true })
  checkOutBookings: BookingListRelationFilter
  @Field(() => BookingTimelineListRelationFilter, { nullable: true })
  bookingTimeline: BookingTimelineListRelationFilter

  @Field(() => [ValetWhereInput], { nullable: true })
  AND: ValetWhereInput[]
  @Field(() => [ValetWhereInput], { nullable: true })
  OR: ValetWhereInput[]
  @Field(() => [ValetWhereInput], { nullable: true })
  NOT: ValetWhereInput[]
}

@InputType()
export class ValetListRelationFilter {
  @Field(() => ValetWhereInput, { nullable: true })
  every: ValetWhereInput
  @Field(() => ValetWhereInput, { nullable: true })
  some: ValetWhereInput
  @Field(() => ValetWhereInput, { nullable: true })
  none: ValetWhereInput
}

@InputType()
export class ValetRelationFilter {
  @Field(() => ValetWhereInput, { nullable: true })
  is: ValetWhereInput
  @Field(() => ValetWhereInput, { nullable: true })
  isNot: ValetWhereInput
}
