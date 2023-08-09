import { Module } from '@nestjs/common'

import { BookingsService } from '../bookings/bookings.service'
import { StripeController } from './stripe.controller'
import StripeService from './stripe.service'

@Module({
  controllers: [StripeController],
  providers: [StripeService, BookingsService],
})
export class StripeModule {}
