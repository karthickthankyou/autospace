import { Module } from '@nestjs/common'
import { ManagersResolver } from './managers.resolver'
import { ManagersService } from './managers.service'

@Module({
  providers: [ManagersResolver, ManagersService],
  exports: [ManagersService],
})
export class ManagersModule {}
