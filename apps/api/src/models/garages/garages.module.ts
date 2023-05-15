import { Module } from '@nestjs/common'
import { GaragesService } from './garages.service'
import { GaragesResolver } from './garages.resolver'

@Module({
  providers: [GaragesResolver, GaragesService],
  exports: [GaragesService],
})
export class GaragesModule {}
