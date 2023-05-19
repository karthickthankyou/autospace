import { Field, ObjectType } from '@nestjs/graphql'
import {
  BookingStatus,
  BookingTimeline as BookingTimelineType,
} from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class BookingTimeline
  implements RestrictProperties<BookingTimeline, BookingTimelineType>
{
  @Field(() => String, { nullable: true })
  valetId: string
  id: number
  timestamp: Date
  bookingId: number
  @Field(() => BookingStatus)
  status: BookingStatus
  managerId: string
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
