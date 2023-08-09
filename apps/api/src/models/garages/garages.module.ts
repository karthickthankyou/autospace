import { Module } from '@nestjs/common'
import { GaragesResolver } from './garages.resolver'
import { GaragesService } from './garages.service'

@Module({
  providers: [GaragesResolver, GaragesService],
  exports: [GaragesService],
})
export class GaragesModule {}
