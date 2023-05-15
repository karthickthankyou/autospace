import { ObjectType } from '@nestjs/graphql'
import { Booking as BookingType } from '@prisma/client'

@ObjectType()
export class Booking implements BookingType {
  id: number
  createdAt: Date
  updatedAt: Date
  pricePerHour: number
  totalPrice: number
  startTime: Date
  endTime: Date
  slotId: number
  customerId: string
  vehicleNumber: string
  phoneNumber: string
  passcode: string
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
