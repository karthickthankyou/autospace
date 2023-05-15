import { Module } from '@nestjs/common'
import { SlotsService } from './slots.service'
import { SlotsResolver } from './slots.resolver'

@Module({
  providers: [SlotsResolver, SlotsService],
  exports: [SlotsService],
})
export class SlotsModule {}
