import { Module } from '@nestjs/common'
import { BookingTimelinesService } from './booking-timelines.service'
import { BookingTimelinesResolver } from './booking-timelines.resolver'

@Module({
  providers: [BookingTimelinesResolver, BookingTimelinesService],
  exports: [BookingTimelinesService],
})
export class BookingTimelinesModule {}
