import { Module } from '@nestjs/common'
import { SlotsResolver } from './slots.resolver'
import { SlotsService } from './slots.service'

@Module({
  providers: [SlotsResolver, SlotsService],
  exports: [SlotsService],
})
export class SlotsModule {}
