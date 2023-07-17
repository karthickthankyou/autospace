import { Module } from '@nestjs/common'
import { BookingsService } from './bookings.service'
import { BookingsResolver } from './bookings.resolver'
import { ValetsService } from '../valets/valets.service'

@Module({
  providers: [BookingsResolver, BookingsService, ValetsService],
  exports: [BookingsService],
})
export class BookingsModule {}
