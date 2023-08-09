import { Module } from '@nestjs/common'
import { AdminsService } from '../admins/admins.service'
import { VerificationsResolver } from './verifications.resolver'
import { VerificationsService } from './verifications.service'

@Module({
  providers: [VerificationsResolver, VerificationsService, AdminsService],
  exports: [VerificationsService],
})
export class VerificationsModule {}
