import { CreateBookingInput } from 'prisma/seed/generated/graphql'
import { TotalPrice } from 'src/common/types'

export class CreateStripeDto {
  uid: string
  totalPriceObj: TotalPrice
  bookingData: CreateBookingInput
}
