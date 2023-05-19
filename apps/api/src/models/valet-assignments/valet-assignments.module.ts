import { Module } from '@nestjs/common'
import { ValetAssignmentsService } from './valet-assignments.service'
import { ValetAssignmentsResolver } from './valet-assignments.resolver'

@Module({
  providers: [ValetAssignmentsResolver, ValetAssignmentsService],
  exports: [ValetAssignmentsService],
})
export class ValetAssignmentsModule {}
