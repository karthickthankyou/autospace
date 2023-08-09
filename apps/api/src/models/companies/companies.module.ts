import { Module } from '@nestjs/common'
import { CompaniesResolver } from './companies.resolver'
import { CompaniesService } from './companies.service'

@Module({
  providers: [CompaniesResolver, CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
