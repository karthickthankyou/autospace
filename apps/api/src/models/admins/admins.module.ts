import { Module } from '@nestjs/common'
import { AdminsResolver } from './admins.resolver'
import { AdminsService } from './admins.service'

@Module({
  providers: [AdminsResolver, AdminsService],
  exports: [AdminsService],
})
export class AdminsModule {}
