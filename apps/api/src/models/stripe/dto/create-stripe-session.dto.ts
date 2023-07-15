import { TotalPrice } from '@autospace-org/types'
import { CreateBookingInput } from 'prisma/seed/generated/graphql'

export class CreateStripeDto {
  uid: string
  totalPriceObj: TotalPrice
  bookingData: CreateBookingInput
}
