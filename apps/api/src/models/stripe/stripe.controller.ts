import { Controller, Post, Body } from '@nestjs/common'
import { CreateStripeDto } from './dto/create-stripe-session.dto'
import StripeService from './stripe.service'

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  create(@Body() createStripeDto: CreateStripeDto) {
    return this.stripeService.createStripeSession(createStripeDto)
  }
}
