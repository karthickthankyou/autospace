import { Module } from '@nestjs/common'
import { ValetsService } from './valets.service'
import { ValetsResolver } from './valets.resolver'

@Module({
  providers: [ValetsResolver, ValetsService],
  exports: [ValetsService],
})
export class ValetsModule {}
