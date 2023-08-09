import { Module } from '@nestjs/common'
import { BookingTimelinesResolver } from './booking-timelines.resolver'
import { BookingTimelinesService } from './booking-timelines.service'

@Module({
  providers: [BookingTimelinesResolver, BookingTimelinesService],
  exports: [BookingTimelinesService],
})
export class BookingTimelinesModule {}
