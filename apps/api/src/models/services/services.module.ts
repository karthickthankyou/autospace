import { Module } from '@nestjs/common'
import { ServicesResolver } from './services.resolver'
import { ServicesService } from './services.service'

@Module({
  providers: [ServicesResolver, ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
