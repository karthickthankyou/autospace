import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { BookingTimelineOrderByWithRelationInput } from './orderBy.args'
import {
  BookingTimelineWhereInput,
  BookingTimelineWhereUniqueInput,
} from './where.args'

registerEnumType(Prisma.BookingTimelineScalarFieldEnum, {
  name: 'BookingTimelineScalarFieldEnum',
})

@ArgsType()
export class FindManyBookingTimelineArgs
  implements
    RestrictProperties<
      FindManyBookingTimelineArgs,
      Omit<Prisma.BookingTimelineFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => BookingTimelineWhereInput, { nullable: true })
  where: BookingTimelineWhereInput
  @Field(() => [BookingTimelineOrderByWithRelationInput], { nullable: true })
  orderBy: BookingTimelineOrderByWithRelationInput[]
  @Field(() => BookingTimelineWhereUniqueInput, { nullable: true })
  cursor: BookingTimelineWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.BookingTimelineScalarFieldEnum], { nullable: true })
  distinct: Prisma.BookingTimelineScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueBookingTimelineArgs {
  @Field({ nullable: true })
  where: BookingTimelineWhereUniqueInput
}
