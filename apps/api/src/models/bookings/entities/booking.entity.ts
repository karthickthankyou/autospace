import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Booking as BookingObjectType, BookingStatus } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(BookingStatus, { name: 'BookingStatus' })

@ObjectType()
export class Booking implements RestrictProperties<Booking, BookingObjectType> {
  @Field(() => BookingStatus)
  status: BookingStatus
  id: number
  createdAt: Date
  updatedAt: Date
  @Field(() => Number, { nullable: true })
  pricePerHour: number
  @Field(() => Number, { nullable: true })
  totalPrice: number
  startTime: Date
  endTime: Date
  slotId: number
  customerId: string
  vehicleNumber: string
  @Field(() => String, { nullable: true })
  phoneNumber: string
  @Field(() => String, { nullable: true })
  passcode: string
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
