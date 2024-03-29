import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common'
import { Response } from 'express'
import { CreateBookingInput } from 'prisma/seed/generated/graphql'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { BookingsService } from '../bookings/bookings.service'
import { CreateStripeDto } from './dto/create-stripe-session.dto'
import StripeService from './stripe.service'

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly prisma: PrismaService,
    private readonly bookingService: BookingsService,
  ) {}

  @Post()
  create(@Body() createStripeDto: CreateStripeDto) {
    return this.stripeService.createStripeSession(createStripeDto)
  }

  @Get('success')
  async handleStripeSuccess(
    @Query('session_id') sessionId: string,
    @Res() res: Response,
  ) {
    const session = await this.stripeService.stripe.checkout.sessions.retrieve(
      sessionId,
    )
    const { uid, bookingData } = session.metadata
    const bookingInput: CreateBookingInput = JSON.parse(bookingData)

    const newBooking = await this.bookingService.create(bookingInput)

    res.redirect(process.env.BOOKINGS_REDIRECT_URL)
  }
}
