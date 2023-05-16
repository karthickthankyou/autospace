import { Injectable } from '@nestjs/common'
import Stripe from 'stripe'
import { CreateStripeDto } from './dto/create-stripe-session.dto'

@Injectable()
export default class StripeService {
  private stripe: Stripe

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    })
  }

  async createStripeSession({ totalPrice, uid, redirectUrl }: CreateStripeDto) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: 1,
          price_data: {
            product_data: {
              name: 'Booking parking slot',
            },
            currency: 'inr',
            unit_amount: +totalPrice * 100,
          },
        },
      ],
      mode: 'payment',
      success_url: `${redirectUrl}/bookings`,
      cancel_url: `${redirectUrl}/booking-failed`,
      metadata: {
        uid,
      },
    })

    return { sessionId: session.id }
  }
}
