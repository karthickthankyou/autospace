import { Module } from '@nestjs/common'
import { ValetsResolver } from './valets.resolver'
import { ValetsService } from './valets.service'

@Module({
  providers: [ValetsResolver, ValetsService],
  exports: [ValetsService],
})
export class ValetsModule {}
