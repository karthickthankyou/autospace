import { Module } from '@nestjs/common'
import { ValetsService } from '../valets/valets.service'
import { BookingsResolver } from './bookings.resolver'
import { BookingsService } from './bookings.service'

@Module({
  providers: [BookingsResolver, BookingsService, ValetsService],
  exports: [BookingsService],
})
export class BookingsModule {}
