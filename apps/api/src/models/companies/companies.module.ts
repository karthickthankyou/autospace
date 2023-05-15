import { Module } from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { CompaniesResolver } from './companies.resolver'

@Module({
  providers: [CompaniesResolver, CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
