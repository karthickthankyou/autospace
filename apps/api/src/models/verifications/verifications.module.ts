import { Module } from '@nestjs/common'
import { VerificationsService } from './verifications.service'
import { VerificationsResolver } from './verifications.resolver'
import { AdminsService } from '../admins/admins.service'

@Module({
  providers: [VerificationsResolver, VerificationsService, AdminsService],
  exports: [VerificationsService],
})
export class VerificationsModule {}
