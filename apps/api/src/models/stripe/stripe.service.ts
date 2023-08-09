import { Injectable } from '@nestjs/common'
import { toTitleCase } from 'src/common/util'
import Stripe from 'stripe'
import { CreateStripeDto } from './dto/create-stripe-session.dto'

@Injectable()
export default class StripeService {
  public stripe: Stripe

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    })
  }

  async createStripeSession({
    totalPriceObj,
    uid,
    bookingData,
  }: CreateStripeDto) {
    console.log('totalPriceObj,bookingData ', totalPriceObj, bookingData)
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: Object.entries(totalPriceObj)
        .filter(([name, price]) => price > 0)
        .map(([name, price]) => ({
          quantity: 1,
          price_data: {
            product_data: {
              name: toTitleCase(name),
            },
            currency: 'inr',
            unit_amount: price * 100,
          },
        })),
      mode: 'payment',
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
      metadata: {
        uid,
        bookingData: JSON.stringify(bookingData),
      },
    })

    return { sessionId: session.id }
  }
}
