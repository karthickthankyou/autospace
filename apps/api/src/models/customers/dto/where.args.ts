import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { BookingListRelationFilter } from 'src/models/bookings/dto/where.args'
import { ReviewListRelationFilter } from 'src/models/reviews/dto/where.args'

@InputType()
export class CustomerWhereUniqueInput
  implements Required<Prisma.CustomerWhereUniqueInput>
{
  @Field(() => String, { nullable: true })
  uid: string
}

@InputType()
export class CustomerWhereInput implements Required<Prisma.CustomerWhereInput> {
  @Field(() => StringFilter, { nullable: true })
  uid: StringFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => StringFilter, { nullable: true })
  displayName: StringFilter
  @Field(() => BookingListRelationFilter, { nullable: true })
  bookings: BookingListRelationFilter

  @Field(() => ReviewListRelationFilter, { nullable: true })
  reviews: Prisma.ReviewListRelationFilter

  @Field(() => [CustomerWhereInput], { nullable: true })
  AND: CustomerWhereInput[]
  @Field(() => [CustomerWhereInput], { nullable: true })
  OR: CustomerWhereInput[]
  @Field(() => [CustomerWhereInput], { nullable: true })
  NOT: CustomerWhereInput[]
}

@InputType()
export class CustomerListRelationFilter {
  @Field(() => CustomerWhereInput)
  every?: CustomerWhereInput
  @Field(() => CustomerWhereInput)
  some?: CustomerWhereInput
  @Field(() => CustomerWhereInput)
  none?: CustomerWhereInput
}

@InputType()
export class CustomerRelationFilter {
  @Field(() => CustomerWhereInput)
  is?: CustomerWhereInput
  @Field(() => CustomerWhereInput)
  isNot?: CustomerWhereInput
}
