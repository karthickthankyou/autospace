import { TotalPrice } from '@autospace-org/types'

export class CreateStripeDto {
  uid: string
  totalPrice: TotalPrice
  redirectUrl: string
}
